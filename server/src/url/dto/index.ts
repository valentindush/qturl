import { ApiProperty } from '@nestjs/swagger';
import { Url } from '@prisma/client';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {
    @ApiProperty({
        description: 'The long URL to be shortened',
        example: 'https://example.com/very/long/path/that/needs/shortening',
    })
    @IsNotEmpty()
    @IsUrl()
    longUrl: string;
}

export class UrlResponseDto {
    @ApiProperty({
        description: 'Unique identifier for the URL',
        example: 'clfg7z2ds0000s4w8u3l25x4p',
    })
    id: string;

    @ApiProperty({
        description: 'Short code for the URL',
        example: 'abc123',
    })
    shortCode: string;

    @ApiProperty({
        description: 'Original long URL',
        example: 'https://example.com/very/long/path/that/needs/shortening',
    })
    longUrl: string;

    @ApiProperty({
        description: 'Number of clicks on this short URL',
        example: 42,
    })
    clicks: number;

    @ApiProperty({
        description: 'When the URL was created',
        example: '2023-03-15T12:00:00.000Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'User ID who created the URL',
        example: 'clfg7z2ds0000s4w8u3l25x4p',
    })
    userId: string;

    constructor(url: Url) {
        this.id = url.id;
        this.shortCode = url.shortCode;
        this.longUrl = url.longUrl;
        this.clicks = url.clicks;
        this.createdAt = url.createdAt;
        this.userId = url.userId;
    }
}