import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { RecuperarPasswordDto } from '../dto/recuperar-password';
import { RestablecerPasswordDto } from '../dto/restablecer-password';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';  // ajusta ruta

@ApiTags('Auth') 
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('register')
    @ApiOperation({ summary: 'Registrar un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Public()
    @Post('login')
    @ApiOperation({ summary: 'Iniciar sesión' })
    @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso' })
    @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Public()
    @Get('verificar')
    @ApiOperation({ summary: 'Verificar correo electrónico' })
    @ApiQuery({ name: 'token', required: true, description: 'Token de verificación enviado por email' })
    @ApiResponse({ status: 200, description: 'Cuenta verificada' })
    @ApiResponse({ status: 400, description: 'Token inválido o expirado' })
    async verificarEmail(@Query('token') token: string) {
        return this.authService.verificarEmail(token);
    }

    @Public()
    @Post('recuperar-password')
    @ApiOperation({ summary: 'Enviar correo de recuperación de contraseña' })
    @ApiResponse({ status: 200, description: 'Correo de recuperación enviado' })
    async recuperarPassword(@Body() dto: RecuperarPasswordDto) {
        return this.authService.recuperarPassword(dto);
    }

    @Public()
    @Post('restablecer-password')
    @ApiOperation({ summary: 'Restablecer la contraseña con token' })
    @ApiResponse({ status: 200, description: 'Contraseña actualizada' })
    @ApiResponse({ status: 400, description: 'Token inválido o expirado' })
    async restablecerPassword(@Body() dto: RestablecerPasswordDto) {
        return this.authService.restablecerPassword(dto);
    }
}