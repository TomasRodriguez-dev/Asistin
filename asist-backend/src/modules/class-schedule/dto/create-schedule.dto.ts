import { IsInt, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateScheduleDto {
    @ApiProperty({ example: 1, description: 'ID de la materia' })
    @IsInt()
    idsubject: number;

    @ApiProperty({ example: 1, description: 'ID de la ubicación válida para la clase' })
    @IsInt()
    idlocation: number;
    

    @ApiProperty({ example: 1, description: 'Día de la semana (0=Domingo, 1=Lunes, ..., 6=Sábado)' })
    @IsInt()
    dayOfWeek: number;

    @ApiProperty({ example: '08:00', description: 'Hora de inicio (formato HH:mm)' })
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Formato de hora inválido (HH:mm)' })
    startTime: string;

    @ApiProperty({ example: '09:30', description: 'Hora de fin (formato HH:mm)' })
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Formato de hora inválido (HH:mm)' })
    endTime: string;
}