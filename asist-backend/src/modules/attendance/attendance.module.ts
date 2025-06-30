import { Module } from '@nestjs/common';
import { AttendanceController } from './controller/attendance.controller';
import { AttendanceService } from './service/attendance.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    controllers: [AttendanceController],
    providers: [AttendanceService],
    exports: [AttendanceService],
    imports: [
        ConfigModule,
        PrismaModule,
        ScheduleModule.forRoot()
    ],
})
export class AttendanceModule {}