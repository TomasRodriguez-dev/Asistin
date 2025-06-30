import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { CreateValidLocationDto } from '../dto/create-valid-location.dto';

@Injectable()
export class ValidLocationsService {
    constructor(private prisma: PrismaService) {}

    create(dto: CreateValidLocationDto) {
        return this.prisma.validLocation.create({
            data: dto,
        });
    }

    findAll() {
        return this.prisma.validLocation.findMany();
    }
}