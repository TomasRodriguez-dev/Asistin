import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { MailService } from 'src/modules/mail/mail.service';
import { RecuperarPasswordDto } from '../dto/recuperar-password';
import { RestablecerPasswordDto } from '../dto/restablecer-password';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private mailService: MailService,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (user && (await bcrypt.compare(pass, user.password))) {
            if (!user.isActive) {
                throw new UnauthorizedException('La cuenta no ha sido verificada.');
            }
            return user;
        }
        return null;
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas.');
        }
        const payload = { email: user.email, sub: user.id };
        return {
            message: 'Inicio de sesión completado con éxito.',
            token: this.jwtService.sign(payload),
        };
    }

    async register(registerDto: RegisterDto) {
        const existingUser = await this.prisma.user.findUnique({ where: { email: registerDto.email } });
        if (existingUser) {
            throw new ConflictException('El correo electrónico ya está en uso.');
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: registerDto.email,
                password: hashedPassword,
                isActive: false,
            },
        });

        const verificationToken = this.jwtService.sign({ email: user.email, id: user.id });

        await this.mailService.sendVerificationEmail(user.email, verificationToken);

        return {
            message: 'Registro exitoso. Por favor verifica tu correo electrónico.',
        };
    }

    async verificarEmail(token: string) {
        let payload;
        try {
            payload = this.jwtService.verify(token);
        } catch {
            throw new BadRequestException('Token de verificación inválido o expirado.');
        }

        const user = await this.prisma.user.findUnique({ where: { id: payload.id } });

        if (!user) throw new NotFoundException('Usuario no encontrado.');
        if (user.isActive) throw new ConflictException('La cuenta ya está verificada.');

        await this.prisma.user.update({
            where: { id: payload.id },
            data: { isActive: true },
        });

        return { message: 'Cuenta verificada con éxito.' };
    }

    async recuperarPassword(recuperarPasswordDto: RecuperarPasswordDto) {
        const user = await this.prisma.user.findUnique({ where: { email: recuperarPasswordDto.email } });
        if (!user) {
            throw new UnauthorizedException('No se encontró un usuario con ese correo electrónico.');
        }

        const recoveryToken = this.jwtService.sign({ email: user.email, id: user.id }, { expiresIn: '1h' });

        await this.mailService.sendRecoveryEmail(user.email, recoveryToken);

        return {
            message: 'Se ha enviado un correo electrónico con instrucciones para restablecer su contraseña.',
        };
    }

    async restablecerPassword(restablecerPasswordDto: RestablecerPasswordDto) {
        let payload;
        try {
            payload = this.jwtService.verify(restablecerPasswordDto.token);
        } catch (error) {
            throw new UnauthorizedException('Token de recuperación inválido o expirado.');
        }

        const user = await this.prisma.user.findUnique({ where: { id: payload.id } });
        if (!user) {
            throw new UnauthorizedException('Usuario no encontrado.');
        }

        const hashedPassword = await bcrypt.hash(restablecerPasswordDto.newPassword, 10);
        await this.prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword },
        });

        return {
            message: 'Contraseña restablecida con éxito.',
        };
    }

    verifyToken(token: string) {
        return this.jwtService.verify(token);
    }
}