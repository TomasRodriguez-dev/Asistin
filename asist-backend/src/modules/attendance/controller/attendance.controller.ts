import { Controller, Post, Body, Get, Request, UseGuards, UnauthorizedException, Param, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AttendanceService } from '../service/attendance.service';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';

@ApiTags('Attendance')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('attendance')
export class AttendanceController {
    constructor(private readonly service: AttendanceService) {}

    @Post()
    @Roles(3) // Solo alumno puede marcar asistencia
    @ApiOperation({ summary: 'Registrar asistencia' })
    async create(@Body() dto: CreateAttendanceDto, @Request() req) {
        if (dto.iduser !== req.user.userId) {
        throw new UnauthorizedException('No puedes registrar asistencia para otro usuario.');
        }
        return this.service.create(dto);
    }

    @Get('history')
    @Roles(3) // Solo alumno puede ver su historial
    @ApiOperation({ summary: 'Obtener historial de asistencias' })
    getHistory(@Request() req) {
        return this.service.getHistoryByUser(req.user.userId);
    }

    @Get('professor/:idsubject')
    @Roles(2) // Solo profesores
    @ApiOperation({ summary: 'Listar asistencias de alumnos para una materia asignada' })
    getForProfessor(@Param('idsubject', ParseIntPipe) idsubject: number, @Request() req) {
        return this.service.getAttendancesBySubjectForProfessor(req.user.userId, idsubject);
    }
}
