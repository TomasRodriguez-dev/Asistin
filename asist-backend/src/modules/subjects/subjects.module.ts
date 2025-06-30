
import { Module } from '@nestjs/common';
import { SubjectsController } from './controller/subjects.controller';
import { SubjectsService } from './service/subjects.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    controllers: [SubjectsController],
    providers: [SubjectsService],
    exports: [SubjectsService],
    imports: [
        ConfigModule,
        PrismaModule
    ]
})
export class SubjectModule {}