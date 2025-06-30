import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateValidLocationDto {
    @ApiProperty({ example: 'Sede Central', description: 'Nombre descriptivo del punto de asistencia' })
    @IsString()
    name: string;

    @ApiProperty({ example: -34.6037, description: 'Latitud' })
    @IsNumber()
    latitude: number;

    @ApiProperty({ example: -58.3816, description: 'Longitud' })
    @IsNumber()
    longitude: number;

    @ApiProperty({ example: 100, description: 'Radio permitido en metros' })
    @IsNumber()
    radius: number;
}