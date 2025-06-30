import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { ValidLocationsService } from '../service/valid-locations.service';
import { CreateValidLocationDto } from '../dto/create-valid-location.dto';

@ApiTags('Valid Locations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('valid-locations')
export class ValidLocationsController {
    constructor(private readonly service: ValidLocationsService) {}

    @Post()
    @Roles(1) // Admin
    @ApiOperation({ summary: 'Registrar nueva ubicación válida para marcar asistencia' })
    create(@Body() dto: CreateValidLocationDto) {
        return this.service.create(dto);
    }

    @Get()
    @Roles(1) // Admin
    @ApiOperation({ summary: 'Listar ubicaciones válidas registradas' })
    findAll() {
        return this.service.findAll();
    }
}
