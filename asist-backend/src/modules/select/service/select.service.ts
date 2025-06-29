import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';

@Injectable()
export class SelectService {
    constructor(private prisma: PrismaService) {}

    async getGenders() {
        return await this.prisma.gender.findMany({
            select: {
                id: true,
                descripcion: true,
            },
        });
    }
}
