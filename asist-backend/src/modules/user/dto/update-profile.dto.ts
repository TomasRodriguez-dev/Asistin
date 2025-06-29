import { IsOptional, IsPhoneNumber, IsUrl, IsString } from 'class-validator';

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
    idgender?: number;  
}