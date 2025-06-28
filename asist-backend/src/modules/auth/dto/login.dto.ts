import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({
        description: 'Correo electrónico del usuario.',
        example: 'usuario@example.com',
    })
    @IsEmail({}, { message: 'El correo electrónico debe ser válido.' })
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario.',
        example: 'password123',
    })
    @IsString()
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
    password: string;
}