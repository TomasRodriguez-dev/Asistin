import { Module } from '@nestjs/common';
import { ClassScheduleService } from './service/class-schedule.service';
import { ClassScheduleController } from './controller/class-schedule.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    controllers: [ClassScheduleController],
    providers: [ClassScheduleService],
    exports: [ClassScheduleService],
    imports: [
        ConfigModule,
        PrismaModule
    ],
})
export class ClassScheduleModule {}