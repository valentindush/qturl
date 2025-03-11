import { ApiProperty } from '@nestjs/swagger';

export class ClickEventDto {
    @ApiProperty({
        description: 'ID of the click event',
        example: 'clfg7z2ds0000s4w8u3l25x4p',
    })
    id: string;

    @ApiProperty({
        description: 'When the click occurred',
        example: '2023-03-15T12:00:00.000Z',
    })
    timestamp: Date;

    @ApiProperty({
        description: 'IP address of the visitor (may be redacted)',
        example: '192.168.1.1',
    })
    ipAddress?: string;

    @ApiProperty({
        description: 'User agent of the device used',
        example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    })
    userAgent?: string;

    @ApiProperty({
        description: 'Referrer URL',
        example: 'https://google.com',
    })
    referer?: string;
}

export class UrlAnalyticsDto {
    @ApiProperty({
        description: 'ID of the URL',
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
        example: 'https://example.com/very/long/path',
    })
    longUrl: string;

    @ApiProperty({
        description: 'Total number of clicks',
        example: 42,
    })
    totalClicks: number;

    @ApiProperty({
        description: 'When the URL was created',
        example: '2023-03-15T12:00:00.000Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'List of click events',
        type: [ClickEventDto],
    })
    clickEvents: ClickEventDto[];

    @ApiProperty({
        description: 'Daily click statistics',
        example: {
            '2023-03-15': 12,
            '2023-03-16': 8,
            '2023-03-17': 22,
        },
    })
    dailyClicks: Record<string, number>;
}