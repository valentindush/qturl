import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService
  ) { }

  context = {
    appName: 'QT Urlz',
    supportEmail: ''
  }

  async sendVerificationEmail(email: string, token: string) {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');
    const verificationUrl = `${frontendUrl}/auth/verify?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Please verify your email address',
      template: 'verification',
      context: {
        verificationUrl,
        ...this.context
      },
    });
  }

  async sendPasswordResetEmail(email: string, token: string) {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');
    const resetUrl = `${frontendUrl}/auth/reset-password?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset your password',
      template: 'reset-password',
      context: {
        resetUrl,
        ...this.context
      },
    });
  }

}