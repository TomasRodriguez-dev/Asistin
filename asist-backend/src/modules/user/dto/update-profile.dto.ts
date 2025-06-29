import { IsOptional, IsUrl, IsString, Matches } from 'class-validator';

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsUrl()
    avatarUrl?: string;

    @IsOptional()
    @Matches(/^\d{7,15}$/, {
        message: 'El número de teléfono debe contener entre 7 y 15 dígitos numéricos',
    })
    phoneNumber?: string;

    @IsOptional()
    idgender?: number;  
}