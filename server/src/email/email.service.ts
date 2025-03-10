import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService
  ) { }


}