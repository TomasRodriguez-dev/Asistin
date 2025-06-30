import { Module } from '@nestjs/common';
import { ValidLocationsService } from './service/valid-locations.service';
import { ValidLocationsController } from './controller/valid-locations.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    controllers: [ValidLocationsController],
    providers: [ValidLocationsService],
    exports: [ValidLocationsService],
    imports: [
        ConfigModule,
        PrismaModule
    ],
})
export class ValidLocationsModule {}