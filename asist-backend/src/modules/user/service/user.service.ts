import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { ProfileResponseDto } from '../dto/profile-response.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getProfile(userId: number): Promise<ProfileResponseDto> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
            id: true,
            idrole: true,
            email: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
            phoneNumber: true,
            idgender: true,
            createdAt: true,
            updatedAt: true,
            },
        });

        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }

        // Mapear null a undefined
        return {
            id: user.id,
            idrole: user.idrole ?? undefined,
            email: user.email,
            firstName: user.firstName ?? undefined,
            lastName: user.lastName ?? undefined,
            avatarUrl: user.avatarUrl ?? undefined,
            phoneNumber: user.phoneNumber ?? undefined,
            idgender: user.idgender ?? undefined,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }

    async updateProfile(userId: number, data: UpdateProfileDto): Promise<ProfileResponseDto> {
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                avatarUrl: true,
                phoneNumber: true,
                idgender: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return {
            id: updatedUser.id,
            email: updatedUser.email,
            firstName: updatedUser.firstName ?? undefined,
            lastName: updatedUser.lastName ?? undefined,
            avatarUrl: updatedUser.avatarUrl ?? undefined,
            phoneNumber: updatedUser.phoneNumber ?? undefined,
            idgender: updatedUser.idgender ?? undefined,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
        };
    }

    async updateAvatar(userId: number, avatarUrl: string): Promise<void> {
        await this.prisma.user.update({
            where: { id: userId },
            data: { avatarUrl },
        });
    }
}