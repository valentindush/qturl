import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { GithubStrategy } from './strategies/github.strategy';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'auth',
          limit: 10,
          ttl:
            60, // 60 sec
        }
      ]
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION', '15m'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    GoogleStrategy,
    GithubStrategy
  ],
  exports: [AuthService],
})
export class AuthModule { }
