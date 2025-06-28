import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from '../mail/mail.service';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
    providers: [AuthService, MailService, JwtStrategy],
    controllers: [AuthController],
    imports: [
        ConfigModule,
        PrismaModule,
        PassportModule.register({defaultStrategy: 'jwt'}),
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