import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SelectService } from '../service/select.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Select') 
@ApiBearerAuth()   
@UseGuards(JwtAuthGuard)
@Controller('select')
export class SelectController {
    constructor(private readonly selectService: SelectService) {}

    @Get('genders')
    @ApiOperation({ summary: 'Obtener géneros' })
    @ApiResponse({ status: 200, description: 'Lista de géneros disponibles.' })
    getGenders() {
        return this.selectService.getGenders();
    }
}