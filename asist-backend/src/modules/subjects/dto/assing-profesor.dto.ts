import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para asignar un profesor a una materia.
 */
export class AssignProfessorDto {
    @ApiProperty({
        description: 'ID de la materia a la que se asignará el profesor',
        example: 1,
    })
    @IsInt()
    idsubject: number;

    @ApiProperty({
        description: 'ID del profesor que será asignado a la materia',
        example: 42,
    })
    @IsInt()
    idprofessor: number;
}
