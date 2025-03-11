import {
    Controller,
    Post,
    Body,
    Get,
    UseGuards,
    Req,
    Res,
    Query,
    HttpCode,
    HttpStatus,
    UseInterceptors,
    ClassSerializerInterceptor,
    BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ConfigService } from '@nestjs/config';
import { Provider } from '@prisma/client';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto, RefreshTokenDto, RegisterDto } from './dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) { }

    @Post('register')
    @UseGuards(ThrottlerGuard)
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User successfully registered' })
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Get('verify')
    @ApiOperation({ summary: 'Verify email with token' })
    @ApiQuery({ name: 'token', required: true })
    @ApiResponse({ status: 200, description: 'Email successfully verified' })
    async verifyEmail(@Query('token') token: string) {
        if (!token) {
            throw new BadRequestException('Verification token is required');
        }
        return this.authService.verifyEmail(token);
    }

    @Post('login')
    @UseGuards(LocalAuthGuard, ThrottlerGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 200, description: 'User successfully logged in' })
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Refresh access token' })
    @ApiResponse({ status: 200, description: 'Token successfully refreshed' })
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authService.refreshToken(refreshTokenDto.refreshToken);
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Logout user' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'User successfully logged out' })
    async logout(@Req() req) {
        return this.authService.logout(req.user.id);
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    @ApiOperation({ summary: 'Google OAuth login' })
    googleAuth() { 
        //redirects to google
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    @ApiOperation({ summary: 'Google OAuth callback' })
    async googleAuthCallback(@Req() req, @Res() res) {
        const { accessToken, refreshToken } = await this.authService.handleOAuthLogin(
            req.user,
            Provider.GOOGLE,
        );
        const frontendUrl = this.configService.get<string>('FRONTEND_URL');
        return res.redirect(`${frontendUrl}/auth/oauth-callback?accessToken=${accessToken}&refreshToken=${refreshToken}`);
    }

    @Get('github')
    @UseGuards(AuthGuard('github'))
    @ApiOperation({ summary: 'GitHub OAuth login' })
    githubAuth() { 
        //redirect to github
    }

    @Get('github/callback')
    @UseGuards(AuthGuard('github'))
    @ApiOperation({ summary: 'GitHub OAuth callback' })
    async githubAuthCallback(@Req() req, @Res() res) {
        const { accessToken, refreshToken } = await this.authService.handleOAuthLogin(
            req.user,
            Provider.GITHUB,
        );
        const frontendUrl = this.configService.get<string>('FRONTEND_URL');
        return res.redirect(`${frontendUrl}/auth/oauth-callback?accessToken=${accessToken}&refreshToken=${refreshToken}`);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get user profile' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'User profile retrieved successfully' })
    getProfile(@Req() req) {
        return req.user;
    }
}