import { Injectable, ConflictException, UnauthorizedException, BadRequestException} from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AttendanceService {
    constructor(private prisma: PrismaService) {}

    private async validateDuplicate(iduser: number, idsubject: number, date: string, type: string) {
        const exists = await this.prisma.attendance.findFirst({
            where: { iduser, idsubject, date: new Date(date), type },
        });


        if (exists) {
            throw new ConflictException(`Ya existe un registro de tipo '${type}' para esta fecha.`);
        }
    }

    private async validateSubjectAssignment(iduser: number, idsubject: number) {
        const isAssigned = await this.prisma.subjectStudent.findFirst({
            where: { idstudent: iduser, idsubject },
        });


        if (!isAssigned) {
            throw new UnauthorizedException('No estás asignado a esta materia.');
        }
    }

    private async checkLocationInRange(latitude: number, longitude: number, idsubject: number): Promise<boolean> {
        const today = this.getLocalDayOfWeek(new Date());

        const schedules = await this.prisma.classSchedule.findMany({
            where: { idsubject, dayOfWeek: today },
            include: { location: true },
        });


        for (const schedule of schedules) {
            const loc = schedule.location;
            const distance = this.getDistanceFromLatLonInMeters(latitude, longitude, loc.latitude, loc.longitude);

            if (distance <= loc.radius) {
                return true;
            }
        }

        return false;
    }

    private async checkTimeInSchedule(idsubject: number, date: Date, time: string): Promise<boolean> {
        const dayOfWeek = this.getLocalDayOfWeek(date);

        const schedules = await this.prisma.classSchedule.findMany({
            where: { idsubject, dayOfWeek },
        });

        const timeMinutes = this.timeStringToMinutes(time);

        for (const schedule of schedules) {
            const startMinutes = this.timeStringToMinutes(schedule.startTime);
            const endMinutes = this.timeStringToMinutes(schedule.endTime);

            if (timeMinutes >= startMinutes && timeMinutes <= endMinutes) {
                return true;
            }
        }

        return false;
    }

    private timeStringToMinutes(time: string): number {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }

    private getDistanceFromLatLonInMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371000;
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    private deg2rad(deg: number): number {
        return deg * (Math.PI / 180);
    }

    private getLocalDayOfWeek(date: Date): number {
        const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        return localDate.getDay();
    }

    private async calculateObservation(idsubject: number, date: Date, time: string,): Promise<'Presente' | 'Tarde' | 'Ausente'> {
        const dayOfWeek = this.getLocalDayOfWeek(date);
        const schedules = await this.prisma.classSchedule.findMany({
            where: { idsubject, dayOfWeek },
        });

        const timeMinutes = this.timeStringToMinutes(time);

        for (const schedule of schedules) {
            const startMinutes = this.timeStringToMinutes(schedule.startTime);
            const endMinutes = this.timeStringToMinutes(schedule.endTime);

            if (timeMinutes >= startMinutes && timeMinutes <= endMinutes) {
                const minutesLate = timeMinutes - startMinutes;

                if (minutesLate <= 30) {
                    return 'Presente';
                } else {
                    return 'Tarde';
                }
            }
        }

        return 'Ausente';
    }

    async create(dto: CreateAttendanceDto) {
        let inRange = false;
        let inTime = false;
        let observation: string | null = null;
        let exitObservation: string | null = null;

        // Validaciones comunes
        await this.validateSubjectAssignment(dto.iduser, dto.idsubject);
        await this.validateDuplicate(dto.iduser, dto.idsubject, dto.date, dto.type);

        if (dto.type === 'entrada') {
            inRange = await this.checkLocationInRange(dto.latitude, dto.longitude, dto.idsubject);
            if (!inRange) {
                throw new BadRequestException({
                    message: 'Ubicación fuera del rango permitido.',
                    code: 'OUT_OF_RANGE',
                });
            }

            inTime = await this.checkTimeInSchedule(dto.idsubject, new Date(dto.date), dto.time);
            if (!inTime) {
                throw new BadRequestException({
                    message: 'Horario fuera del rango permitido.',
                    code: 'OUT_OF_TIME',
                });
            }

            observation = await this.calculateObservation(dto.idsubject, new Date(dto.date), dto.time);
        }

        if (dto.type === 'salida') {
            const schedules = await this.prisma.classSchedule.findMany({
                where: {
                    idsubject: dto.idsubject,
                    dayOfWeek: this.getLocalDayOfWeek(new Date(dto.date)),
                },
            });

            const exitMinutes = this.timeStringToMinutes(dto.time);

            const matching = schedules.find(s => {
                const start = this.timeStringToMinutes(s.startTime);
                const end = this.timeStringToMinutes(s.endTime);
                return exitMinutes >= start && exitMinutes <= end + 15;
            });

            if (!matching) {
                throw new BadRequestException({
                    message: 'El horario de salida no es válido.',
                    code: 'INVALID_EXIT_TIME',
                });
            }

            const endMinutes = this.timeStringToMinutes(matching.endTime);
            exitObservation = exitMinutes < endMinutes ? 'Salió antes de tiempo' : 'Salió a tiempo';
        }

        return this.prisma.attendance.create({
            data: {
                date: new Date(dto.date),
                time: dto.time,
                type: dto.type,
                latitude: dto.latitude,
                longitude: dto.longitude,
                photoUrl: dto.photoUrl,
                inRange,
                inTime,
                iduser: dto.iduser,
                idsubject: dto.idsubject,
                observation,
                exitObservation,
            },
        });
    }

    async getHistoryByUser(iduser: number) {
        return this.prisma.attendance.findMany({
            where: { iduser },
            orderBy: { date: 'desc' },
            include: {
                subject: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
    }

    async getAttendancesBySubjectForProfessor(idprofessor: number, idsubject: number) {
        const assigned = await this.prisma.subjectProfessor.findFirst({
            where: { idsubject, idprofessor },
        });

        if (!assigned) {
            throw new UnauthorizedException('No tienes acceso a esta materia.');
        }

        return this.prisma.attendance.findMany({
            where: { idsubject },
            orderBy: { date: 'desc' },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                subject: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleAutomaticAbsences() {
        await this.markAutomaticAbsencesForToday();
    }

    private async markAutomaticAbsencesForToday() {
        const today = new Date();
        const dayOfWeek = this.getLocalDayOfWeek(today);
        const dateOnly = new Date(today.toISOString().split('T')[0]); 

        const schedules = await this.prisma.classSchedule.findMany({
            where: { dayOfWeek },
            include: {
                subject: {
                    include: {
                        students: true, 
                    },
                },
            },
        });

        for (const schedule of schedules) {
            const subjectId = schedule.idsubject;

            for (const student of schedule.subject.students) {
                const alreadyExists = await this.prisma.attendance.findFirst({
                    where: {
                        iduser: student.idstudent,
                        idsubject: subjectId,
                        date: dateOnly,
                    },
                });

                if (!alreadyExists) {

                    await this.prisma.attendance.create({
                        data: {
                            date: dateOnly,
                            time: schedule.startTime,
                            type: 'entrada',
                            latitude: 0,
                            longitude: 0,
                            photoUrl: '',
                            inRange: false,
                            inTime: false,
                            observation: 'Ausente',
                            iduser: student.idstudent,
                            idsubject: subjectId,
                        },
                    });
                }
            }
        }
    }
}
