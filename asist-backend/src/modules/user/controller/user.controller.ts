import { Controller, Get, Req, Patch, Body, UseGuards, Post, UseInterceptors, BadRequestException, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { ProfileResponseDto } from '../dto/profile-response.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @ApiOperation({ summary: 'Obtener el perfil del usuario autenticado' })
    @ApiResponse({ status: 200, description: 'Perfil obtenido exitosamente', type: ProfileResponseDto })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    async getProfile(@Req() req): Promise<ProfileResponseDto> {
        return this.userService.getProfile(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('profile')
    @ApiOperation({ summary: 'Actualizar el perfil del usuario autenticado' })
    @ApiResponse({ status: 200, description: 'Perfil actualizado exitosamente', type: ProfileResponseDto })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    async updateProfile(@Req() req, @Body() updateProfileDto: UpdateProfileDto): Promise<ProfileResponseDto> {
        return this.userService.updateProfile(req.user.userId, updateProfileDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('avatar')
    @UseInterceptors(
        FileInterceptor('avatar', {
        storage: diskStorage({
            destination: './uploads/avatars',
            filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            cb(null, `avatar-${req.user}-${uniqueSuffix}${ext}`);
            },
        }),
        limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            cb(new BadRequestException('Solo imágenes jpg/jpeg/png permitidas'), false);
            } else {
            cb(null, true);
            }
        },
        }),
    )
    async uploadAvatar(@UploadedFile() file: Express.Multer.File, @Req() req) {
        if (!file) {
        throw new BadRequestException('Archivo no proporcionado');
        }

        const avatarUrl = `/uploads/avatars/${file.filename}`;
        await this.userService.updateAvatar(req.user.userId, avatarUrl);

        return { message: 'Avatar actualizado', avatarUrl };
    }
}
