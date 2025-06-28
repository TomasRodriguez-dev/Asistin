import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from '../mail/mail.service';

@Module({
    providers: [AuthService, MailService],
    controllers: [AuthController],
    imports: [
        ConfigModule,
        PrismaModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const secret = configService.get<string>('JWT_SECRET');
                return {
                    secret: secret,
                    signOptions: { expiresIn: '15m' }, 
                };
            },
            inject: [ConfigService],
        }),
    ],
})
export class AuthModule {}