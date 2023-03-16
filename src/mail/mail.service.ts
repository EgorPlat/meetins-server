import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(email: string, name: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Meetins - Приглашение на мероприятие!',
        template: './invitation', // `.hbs` extension is appended automatically
        context: { // ✏️ filling curly brackets with content
          name: name,
        },
      });
    } catch(er) {
      console.log(er);
    }
  }
}
