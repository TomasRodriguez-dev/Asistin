import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
    imports: [
        ConfigModule,
        PrismaModule
    ]
})
export class UserModule {}