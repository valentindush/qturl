import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { UrlModule } from './url/url.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'localhost',
        port: 1025,
        ignoreTLS: true,
        secure: false,
      },
      defaults: {
        from: '"QT" <no-reply@qtglobal.com>',
      },
      template: {
        dir: join(__dirname, 'email/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true
    }),
    PrismaModule,
    EmailModule,
    AuthModule,
    UrlModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
