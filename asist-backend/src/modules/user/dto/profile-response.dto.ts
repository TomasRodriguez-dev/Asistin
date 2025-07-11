import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProfileResponseDto {
    @ApiProperty()
    id: number;

    @ApiPropertyOptional({
        description: 'ID del rol del usuario (clave foránea a Role)',
        example: 3,
    })
    idrole?: number;

    @ApiProperty()
    email: string;

    @ApiPropertyOptional()
    firstName?: string;

    @ApiPropertyOptional()
    lastName?: string;

    @ApiPropertyOptional()
    avatarUrl?: string;

    @ApiPropertyOptional()
    phoneNumber?: string;

    @ApiPropertyOptional({
        description: 'ID del género (clave foránea a Gender)',
        example: 1,
    })
    idgender?: number; 

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}