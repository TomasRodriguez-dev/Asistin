import { Module } from '@nestjs/common';
import { SelectService } from './service/select.service';
import { SelectController } from './controller/select.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    controllers: [SelectController],
    providers: [SelectService],
    exports: [SelectService],
    imports: [
        ConfigModule,
        PrismaModule
    ]
})
export class SelectModule {}