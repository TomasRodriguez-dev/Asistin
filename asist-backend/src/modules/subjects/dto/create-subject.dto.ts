import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para la creación de una asignatura.
 */
export class CreateSubjectDto {
    @ApiProperty({
        description: 'Nombre de la asignatura',
        example: 'Matemáticas',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Descripción de la asignatura',
        example: 'Asignatura que abarca álgebra, geometría y cálculo.',
    })
    @IsString()
    description: string;
}
