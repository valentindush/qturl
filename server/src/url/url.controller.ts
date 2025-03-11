import {
    Controller,
    Post,
    Body,
    UseGuards,
    Get,
    Param,
    Delete,
    Req,
    Res,
    HttpCode
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UrlService } from './url.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request, Response } from 'express';
import { CreateUrlDto, UrlResponseDto } from './dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@ApiTags('URL Shortener')
@Controller()
export class UrlController {
    constructor(private readonly urlService: UrlService) { }

    @Post('shorten')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a shortened URL' })
    @ApiResponse({
        status: 201,
        description: 'URL shortened successfully',
        type: UrlResponseDto
    })
    async createShortUrl(
        @Body() createUrlDto: CreateUrlDto,
        @GetUser('id') userId: string,
    ): Promise<UrlResponseDto> {
        const url = await this.urlService.create(createUrlDto, userId);
        return new UrlResponseDto(url);
    }

    @Get('urls')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all URLs for the authenticated user' })
    @ApiResponse({
        status: 200,
        description: 'List of all URLs created by the user',
        type: [UrlResponseDto]
    })
    async getUserUrls(@GetUser('id') userId: string): Promise<UrlResponseDto[]> {
        const urls = await this.urlService.findAll(userId);
        return urls.map(url => new UrlResponseDto(url));
    }

    @Get(':shortCode')
    @ApiOperation({ summary: 'Redirect to the original URL' })
    @ApiResponse({ status: 302, description: 'Redirect to the original URL' })
    @ApiResponse({ status: 404, description: 'URL not found' })
    async redirect(
        @Param('shortCode') shortCode: string,
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<void> {
        const url = await this.urlService.findByShortCode(shortCode);

        await this.urlService.incrementClicks(
            url.id,
            req.ip,
            req.headers['user-agent'],
            req.headers.referer,
        );

        res.redirect(url.longUrl);
    }

    @Delete('urls/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @HttpCode(204)
    @ApiOperation({ summary: 'Delete a URL' })
    @ApiResponse({ status: 204, description: 'URL deleted successfully' })
    @ApiResponse({ status: 404, description: 'URL not found' })
    async deleteUrl(
        @Param('id') id: string,
        @GetUser('id') userId: string,
    ): Promise<void> {
        await this.urlService.delete(id, userId);
    }
}