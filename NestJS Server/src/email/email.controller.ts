import { InjectQueue } from '@nestjs/bull';
import { Controller, Post, Body } from '@nestjs/common';
import { Queue } from 'bull';

@Controller()
export class EmailController {
  constructor(@InjectQueue('email') private readonly emailQueue: Queue) {}

  @Post('send-email')
  async sendNewEmail(
    @Body() body: {
      "to": string,
      "from": string,
      "message": string,
      "subject": string
    }
  ) {
    await this.emailQueue.add(body, {
      attempts: 2
    });
    return "OK";
  }
}
