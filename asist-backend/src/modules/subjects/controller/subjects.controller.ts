import { Body, Controller, Get, Post, UseGuards, Request, Query } from '@nestjs/common';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { SubjectsService } from '../service/subjects.service';
import { CreateSubjectDto } from '../dto/create-subject.dto';
import { AssignProfessorDto } from '../dto/assing-profesor.dto';
import { AssignStudentDto } from '../dto/assing-student.dto';

@ApiTags('Subjects')
@ApiBearerAuth()
@Controller('subjects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubjectsController {
    constructor(private service: SubjectsService) {}

    @Post()
    @Roles(1) // Admin 
    @ApiOperation({ summary: 'Crear una nueva materia' })
    @ApiResponse({ status: 201, description: 'Materia creada con éxito.' })
    create(@Body() dto: CreateSubjectDto) {
        return this.service.create(dto);
    }

    @Get()
    @Roles(1) // Admin 
    @ApiOperation({ summary: 'Listar todas las materias' })
    findAll() {
        return this.service.findAll();
    }

    @Get('professors-subject')
    @Roles(1) // Admin
    @ApiOperation({ summary: 'Listar profesores asignados a una materia' })
    getProfessorsBySubject(@Query('idsubject') id: string) {
        return this.service.getProfessorsBySubject(Number(id));
    }

    @Get('students-subject')
    @Roles(1) // Admin
    @ApiOperation({ summary: 'Listar alumnos asignados a una materia' })
    getStudentsBySubject(@Query('idsubject') id: string) {
        return this.service.getStudentsBySubject(Number(id));
    }

    @Get('professor')
    @Roles(2) // Professor 
    @ApiOperation({ summary: 'Listar materias asignadas a un profesor' })
    findByProfessor(@Request() req) {
        return this.service.findByProfessor(req.user.userId);
    }

    @Get('student')
    @Roles(3) // Student 
    @ApiOperation({ summary: 'Listar materias asignadas a un alumno' })
    findByStudent(@Request() req) {
        return this.service.findByStudent(req.user.userId);
    }

    @Post('assign-professor')
    @Roles(1) // Admin
    @ApiOperation({ summary: 'Asignar un profesor a una materia' })
    assignProfessor(@Body() dto: AssignProfessorDto) {
        return this.service.assignProfessor(dto.idsubject, dto.idprofessor);
    }

    @Post('assign-student')
    @Roles(1) // Admin 
    @ApiOperation({ summary: 'Asignar un alumno a una materia' })
    assignStudent(@Body() dto: AssignStudentDto) {
        return this.service.assignStudent(dto.idsubject, dto.idstudent);
    }
}