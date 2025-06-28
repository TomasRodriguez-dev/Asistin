import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RestablecerPasswordDto {
    @ApiProperty({
        description: 'Token de restablecimiento de contraseña.',
        example: 'abc123token'
    })
    @IsString()
    @IsNotEmpty({ message: 'El token no puede estar vacío.' })
    token: string;

    @ApiProperty({
        description: 'Nueva contraseña del usuario.',
        example: 'password123',
        minLength: 8
    })
    @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
    newPassword: string;
}