import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para asignar un estudiante a una materia.
 */
export class AssignStudentDto {
    @ApiProperty({
        description: 'ID de la materia a la que se asignará el estudiante',
        example: 1,
    })
    @IsInt()
    idsubject: number;

    @ApiProperty({
        description: 'ID del estudiante que será asignado',
        example: 42,
    })
    @IsInt()
    idstudent: number;
}
