import { Controller, Get, Req, Patch, Body, UseGuards, Post, UseInterceptors, BadRequestException, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
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
    @Patch('avatar-url')
    @ApiOperation({ summary: 'Actualizar avatar del usuario (URL desde Firebase)' })
    @ApiResponse({ status: 200, description: 'Avatar actualizado exitosamente' })
    @ApiResponse({ status: 400, description: 'URL inválida' })
    async updateAvatarUrl(@Req() req, @Body() body: { url: string }) {
        const { url } = body;

        // Validar que venga una URL y sea de Firebase
        if (!url || !url.startsWith('https://firebasestorage.googleapis.com/v0/b/asistin-a492d.firebasestorage.app/o/')) {
            throw new BadRequestException('URL inválida o no es de Firebase Storage');
        }

        const userId = req.user.userId;

        const objectPathEncoded = url.split('/o/')[1]?.split('?')[0]; 

        if (!objectPathEncoded) {
            throw new BadRequestException('No se pudo extraer el path del archivo');
        }

        const objectPath = decodeURIComponent(objectPathEncoded); 

        if (!objectPath.includes(`avatars/${userId}/`)) {
            throw new BadRequestException('La URL no parece pertenecer a este usuario');
        }

        await this.userService.updateAvatar(userId, url);

        return { message: 'Avatar actualizado', avatarUrl: url };
    }

}
