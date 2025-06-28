import { IsOptional, IsString, IsEnum, IsUrl, IsPhoneNumber } from 'class-validator';
import { Gender } from '../enums/gender.enum';  

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
    @IsPhoneNumber() 
    phoneNumber?: string;

    @IsOptional()
    @IsEnum(Gender, { message: 'El género debe ser uno de: Masculino, Femenino, Otro, NoEspecifica' })
    gender?: Gender;
}