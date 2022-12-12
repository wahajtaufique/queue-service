import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailProcessor } from './email.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
  controllers: [EmailController],
  providers: [EmailProcessor],
})
export class EmailModule {}
