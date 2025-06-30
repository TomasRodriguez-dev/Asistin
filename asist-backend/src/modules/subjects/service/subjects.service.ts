import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { CreateSubjectDto } from '../dto/create-subject.dto';

@Injectable()
export class SubjectsService {
    constructor(private prisma: PrismaService) {}

    create(dto: CreateSubjectDto) {
        return this.prisma.subject.create({ data: dto });
    }

    findAll() {
        return this.prisma.subject.findMany();
    }

    findByProfessor(idprofessor: number) {
        return this.prisma.subject.findMany({
            where: {
                professors: {
                    some: { idprofessor: idprofessor },
                },
            },
        });
    }

    findByStudent(idstudent: number) {
        return this.prisma.subject.findMany({
            where: {
                students: {
                    some: { idstudent: idstudent },
                },
            },
        });
    }

    async assignProfessor(idsubject: number, idprofessor: number) {
        const existing = await this.prisma.subjectProfessor.findUnique({
            where: {
                idsubject_idprofessor: {
                    idsubject,
                    idprofessor,
                },  
            },
        });
        if (existing) {
            throw new ConflictException('Este profesor ya está asignado a esta materia.');
        }
        return this.prisma.subjectProfessor.create({
            data: { idsubject: idsubject, idprofessor: idprofessor },
        });
    }

    async assignStudent(idsubject: number, idstudent: number) {
        const existing = await this.prisma.subjectStudent.findUnique({
            where: {
            idsubject_idstudent: {
                idsubject,
                idstudent,
            },
            },
        });

        if (existing) {
            throw new ConflictException('Este alumno ya está asignado a esta materia.');
        }

        return this.prisma.subjectStudent.create({
            data: { idsubject, idstudent },
        });
    }

    async getProfessorsBySubject(idsubject: number) {
        return this.prisma.subjectProfessor.findMany({
            where: { idsubject },
            include: {
                professor: {
                    select: { id: true, firstName: true, lastName: true, email: true },
                },
            },
        });
    }

    async getStudentsBySubject(idsubject: number) {
        return this.prisma.subjectStudent.findMany({
            where: { idsubject },
            include: {
                student: {
                    select: { id: true, firstName: true, lastName: true, email: true },
                },
            },
        });
    }
}