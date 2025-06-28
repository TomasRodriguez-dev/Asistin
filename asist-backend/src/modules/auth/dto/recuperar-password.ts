import { IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RecuperarPasswordDto {
    @ApiProperty({
        description: 'Correo electrónico del usuario',
        example: 'usuario@ejemplo.com',
    })
    @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
    email: string;
}