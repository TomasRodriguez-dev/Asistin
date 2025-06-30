import { Controller, Post, Body, Get, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ClassScheduleService } from '../service/class-schedule.service';
import { CreateScheduleDto } from '../dto/create-schedule.dto';

@ApiTags('ClassSchedule')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('class-schedule')
export class ClassScheduleController {
    constructor(private readonly service: ClassScheduleService) {}

    @Post()
    @Roles(1) // admin
    @ApiOperation({ summary: 'Crear horario de cursada' })
    create(@Body() dto: CreateScheduleDto) {
        return this.service.create(dto);
    }

    @Get('by-subject')
    @Roles(1) // admin
    @ApiOperation({ summary: 'Listar horarios por materia' })
    findBySubject(@Query('idsubject') id: string) {
        return this.service.findBySubject(Number(id));
    }

    @Get('professor')
    @Roles(2) // professor
    @ApiOperation({ summary: 'Ver horarios del profesor logueado' })
    findByProfessor(@Request() req) {
        return this.service.findByProfessor(req.user.userId);
    }

    @Get('student')
    @Roles(3) // student
    @ApiOperation({ summary: 'Ver horarios del alumno logueado' })
    findByStudent(@Request() req) {
        return this.service.findByStudent(req.user.userId);
    }
}