import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { add } from 'date-fns';
import { Provider } from '@prisma/client';
import { EmailService } from 'src/email/email.service';

interface RegisterDto {
    email: string;
    username: string;
    password: string;
}

interface LoginDto {
    email: string;
    password: string;
}

interface JwtPayload {
    sub: string;
    email: string;
    isVerified: boolean;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService,
        private readonly configService: ConfigService,
    ) { }

    async register(registerDto: RegisterDto) {
        const { email, username, password } = registerDto;

        const existingUser = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username },
                ],
            },
        });

        if (existingUser) {
            throw new ConflictException('Email or username already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate verification token
        const verificationToken = uuidv4();
        const verificationExpiry = add(new Date(), { hours: 24 });

        // Create user
        const user = await this.prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
                provider: Provider.LOCAL,
                verificationToken,
                verificationExpiry,
            },
        });

        // Send verification email
        await this.emailService.sendVerificationEmail(
            email,
            verificationToken,
        );

        return {
            message: 'User registered successfully. Please verify your email.',
        };
    }

    // Verify email with token
    async verifyEmail(token: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                verificationToken: token,
                verificationExpiry: {
                    gte: new Date(),
                },
            },
        });

        if (!user) {
            throw new BadRequestException('Invalid or expired verification token');
        }

        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                isEmailVerified: true,
                verificationToken: null,
                verificationExpiry: null,
            },
        });

        return {
            message: 'Email verified successfully',
        };
    }

    // Login with email and password
    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user || user.provider !== Provider.LOCAL) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if (!user.isEmailVerified) {
            throw new UnauthorizedException('Email not verified');
        }

        const tokens = await this.generateTokens(user);

        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
            },
        };
    }

    async handleOAuthLogin(profile: any, provider: Provider) {
        let user = await this.prisma.user.findFirst({
            where: {
                OR: [
                    {
                        provider,
                        providerId: profile.id.toString(),
                    },
                    {
                        email: profile.email,
                    },
                ],
            },
        });

        if (user && user.provider !== provider && user.provider !== null) {
            // User exists but with a different provider
            throw new ConflictException(`Email already registered with ${user.provider}`);
        }

        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    email: profile.email,
                    username: profile.username || profile.displayName?.replace(/\s/g, '').toLowerCase() || profile.email.split('@')[0],
                    provider,
                    providerId: profile.id.toString(),
                    isEmailVerified: true,
                },
            });
        } else if (user.provider !== provider) {
            user = await this.prisma.user.update({
                where: { id: user.id },
                data: {
                    provider,
                    providerId: profile.id.toString(),
                    isEmailVerified: true,
                },
            });
        }

        const tokens = await this.generateTokens(user);

        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
            },
        };
    }

    async refreshToken(token: string) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    refreshToken: token,
                    refreshTokenExpiry: {
                        gte: new Date(),
                    },
                },
            });

            if (!user) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            const tokens = await this.generateTokens(user);

            return {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            };
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async logout(userId: string) {
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                refreshToken: null,
                refreshTokenExpiry: null,
            },
        });

        return {
            message: 'Logged out successfully',
        };
    }

    private async generateTokens(user: any) {
        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
            isVerified: user.isEmailVerified,
        };

        const accessToken = this.jwtService.sign(payload);

        const refreshToken = uuidv4();
        const refreshTokenExpiry = add(new Date(), { days: 7 });

        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                refreshToken,
                refreshTokenExpiry,
            },
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    async validateUser(payload: JwtPayload) {
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        return {
            id: user.id,
            email: user.email,
            username: user.username,
            isEmailVerified: user.isEmailVerified,
        };
    }

    async validateUserCredentials(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user || !user.password) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return null;
        }

        return {
            id: user.id,
            email: user.email,
            username: user.username,
            isEmailVerified: user.isEmailVerified,
        };
    }
}