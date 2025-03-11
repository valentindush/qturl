import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UrlService } from '../url/url.service';
import { ClickEventDto, UrlAnalyticsDto } from './dto';

@Injectable()
export class AnalyticsService {
    constructor(
        private prisma: PrismaService,
        private urlService: UrlService,
    ) { }

    async getUrlAnalytics(shortCode: string, userId: string): Promise<UrlAnalyticsDto> {
        const url = await this.prisma.url.findUnique({
            where: { shortCode },
            include: {
                clickEvents: {
                    orderBy: {
                        timestamp: 'desc',
                    },
                },
            },
        });

        if (!url) {
            throw new NotFoundException('URL not found');
        }

        if (url.userId !== userId) {
            throw new NotFoundException('URL not found');
        }

        const dailyClicks: Record<string, number> = {};

        url.clickEvents.forEach(event => {
            const day = event.timestamp.toISOString().split('T')[0];
            dailyClicks[day] = (dailyClicks[day] || 0) + 1;
        });

        const clickEvents: ClickEventDto[] = url.clickEvents.map(event => ({
            id: event.id,
            timestamp: event.timestamp,
            ipAddress: event.ipAddress,
            userAgent: event.userAgent,
            referer: event.referer,
        }));

        return {
            id: url.id,
            shortCode: url.shortCode,
            longUrl: url.longUrl,
            totalClicks: url.clicks,
            createdAt: url.createdAt,
            clickEvents,
            dailyClicks,
        };
    }

    async getUrlsAnalyticsSummary(userId: string): Promise<any[]> {
        const urls = await this.prisma.url.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { clickEvents: true },
                },
                clickEvents: true
            },
        });

        return urls.map(url => ({
            id: url.id,
            shortCode: url.shortCode,
            longUrl: url.longUrl,
            clicks: url.clicks,
            createdAt: url.createdAt,
        }));
    }
}