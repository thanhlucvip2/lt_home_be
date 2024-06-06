import { Injectable, Logger } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}

  public async send(options: ISendMailOptions): Promise<void> {
    this.mailerService
      .sendMail({
        to: options.to,
        from: options.from,
        subject: options.subject,
        template: options.template,
        context: options.context,
      })
      .catch((error) => {
        this.logger.error('########ERROR############');
        this.logger.error(error);
      });
  }
}
