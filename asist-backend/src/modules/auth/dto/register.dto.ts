import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
    @ApiProperty({
        description: 'Correo electrónico del usuario',
        example: 'usuario@example.com',
    })
    @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario. Debe tener al menos 8 caracteres.',
        example: 'password123',
    })
    @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
    password: string;
}