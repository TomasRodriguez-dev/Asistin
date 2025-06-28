import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty({ required: false })
    firstName?: string;

    @ApiProperty({ required: false })
    lastName?: string;

    @ApiProperty({ required: false })
    avatarUrl?: string;

    @ApiProperty({ required: false })
    phoneNumber?: string;

    @ApiProperty({ required: false })
    gender?: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}