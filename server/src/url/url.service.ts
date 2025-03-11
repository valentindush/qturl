import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Url } from '@prisma/client';
import { CreateUrlDto } from './dto';

const { customAlphabet } = require('fix-esm').require('nanoid');

@Injectable()
export class UrlService {
    constructor(private prisma: PrismaService) { }

    private generateShortCode(): string {
        const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);
        return nanoid();
    }

    async create(createUrlDto: CreateUrlDto, userId: string): Promise<Url> {
        const { longUrl } = createUrlDto;
        const shortCode = this.generateShortCode();

        return this.prisma.url.create({
            data: {
                longUrl,
                shortCode,
                userId,
            },
        });
    }

    async findAll(userId: string): Promise<Url[]> {
        return this.prisma.url.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findByShortCode(shortCode: string): Promise<Url> {
        const url = await this.prisma.url.findUnique({
            where: { shortCode },
        });

        if (!url) {
            throw new NotFoundException('URL not found');
        }

        return url;
    }

    async incrementClicks(id: string, ipAddress?: string, userAgent?: string, referer?: string): Promise<Url> {
        await this.prisma.clickEvent.create({
            data: {
                urlId: id,
                ipAddress,
                userAgent,
                referer,
            },
        });

        return this.prisma.url.update({
            where: { id },
            data: { clicks: { increment: 1 } },
        });
    }

    async delete(id: string, userId: string): Promise<void> {
        const url = await this.prisma.url.findUnique({
            where: { id },
        });

        if (!url) {
            throw new NotFoundException('URL not found');
        }

        if (url.userId !== userId) {
            throw new BadRequestException('You can only delete your own URLs');
        }

        await this.prisma.url.delete({
            where: { id },
        });
    }
}