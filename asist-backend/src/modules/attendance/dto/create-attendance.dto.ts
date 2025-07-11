import { IsInt, IsString, IsBoolean, IsDateString, IsNumber, IsIn, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAttendanceDto {
    @ApiProperty({ example: '2025-06-30', description: 'Fecha del registro (YYYY-MM-DD)' })
    @IsDateString()
    date: string;

    @ApiProperty({ example: '08:15', description: 'Hora exacta (HH:mm)' })
    @IsString()
    time: string;

    @ApiProperty({ example: 'entrada', description: "Tipo: 'entrada' o 'salida'" })
    @IsIn(['entrada', 'salida'])
    type: string;

    @ApiProperty({ example: -34.6037, description: 'Latitud' })
    @IsNumber()
    latitude: number;

    @ApiProperty({ example: -58.3816, description: 'Longitud' })
    @IsNumber()
    longitude: number;

    @ApiProperty({ example: 'https://storage.example.com/photos/abc123.jpg', description: 'URL de la foto tomada' })
    @IsUrl()
    photoUrl: string;

    @ApiProperty({ example: 1, description: 'ID de la materia' })
    @IsInt()
    idsubject: number;
}
