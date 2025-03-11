import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UrlAnalyticsDto } from './dto';

@ApiTags('Analytics')
@Controller('analytics')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Get('all')
    @ApiOperation({ summary: 'Get summary analytics for all user URLs' })
    @ApiResponse({
        status: 200,
        description: 'Analytics summary retrieved successfully',
    })
    async getAnalyticsSummary(@GetUser('id') userId: string): Promise<any[]> {
        return this.analyticsService.getUrlsAnalyticsSummary(userId);
    }

    @Get(':shortCode')
    @ApiOperation({ summary: 'Get analytics for a specific URL' })
    @ApiResponse({
        status: 200,
        description: 'URL analytics retrieved successfully',
        type: UrlAnalyticsDto
    })
    @ApiResponse({ status: 404, description: 'URL not found' })
    async getUrlAnalytics(
        @Param('shortCode') shortCode: string,
        @GetUser('id') userId: string,
    ): Promise<UrlAnalyticsDto> {
        return this.analyticsService.getUrlAnalytics(shortCode, userId);
    }

}