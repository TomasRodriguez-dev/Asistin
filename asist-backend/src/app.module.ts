import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { UserModule } from './modules/user/user.module';
import { SelectModule } from './modules/select/select.module';
import { SubjectModule } from './modules/subjects/subjects.module';
import { ClassScheduleModule } from './modules/class-schedule/class-shedule.module';
import { ValidLocationsModule } from './modules/valid-locations/valid-locations.module';
import { AttendanceModule } from './modules/attendance/attendance.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, SubjectModule, ClassScheduleModule, AttendanceModule, ValidLocationsModule, SelectModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
})
export class AppModule {}
