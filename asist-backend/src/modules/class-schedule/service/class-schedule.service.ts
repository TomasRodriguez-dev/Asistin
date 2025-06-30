import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { CreateScheduleDto } from '../dto/create-schedule.dto';

@Injectable()
export class ClassScheduleService {
    constructor(private prisma: PrismaService) {}

    create(dto: CreateScheduleDto) {
        return this.prisma.classSchedule.create({
            data: {
            idsubject: dto.idsubject,
            dayOfWeek: dto.dayOfWeek,
            startTime: dto.startTime,
            endTime: dto.endTime,
            idlocation: dto.idlocation,
            },
        });
    }

    findBySubject(idsubject: number) {
        return this.prisma.classSchedule.findMany({ where: { idsubject } });
    }

    findByProfessor(idprofessor: number) {
        return this.prisma.classSchedule.findMany({
            where: {
                subject: {
                    professors: {
                        some: { idprofessor },
                    },
                },
            },
            include: { subject: true },
        });
    }

    findByStudent(idstudent: number) {
        return this.prisma.classSchedule.findMany({
            where: {
                subject: {
                    students: {
                        some: { idstudent },
                    },
                },
            },
            include: { subject: true },
        });
    }
}