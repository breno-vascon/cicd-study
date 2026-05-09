import { Module } from '@nestjs/common';
import { GreetingController } from '../../../presentation/greeting/greeting.controller';
import { GreetingUsecaseProvider } from '../../providers/greeting/greeting.usecase.provider';

@Module({
  controllers: [GreetingController],
  providers: [GreetingUsecaseProvider],
  exports: [GreetingUsecaseProvider],
})
export class GreetingModule { }
