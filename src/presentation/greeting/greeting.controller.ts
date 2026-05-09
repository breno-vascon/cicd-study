import { Controller, Get, Inject } from '@nestjs/common';
import type { IGreetingUsecase } from '../../domain/usecases/greeting/greeting.types';
import { IGreetingUsecaseSymbol } from '../../domain/usecases/greeting/greeting.types';

@Controller()
export class GreetingController {
  constructor(
    @Inject(IGreetingUsecaseSymbol)
    private readonly greetingUsecase: IGreetingUsecase,
  ) { }

  @Get()
  getHello(): string {
    const { message } = this.greetingUsecase.execute();
    return message;
  }
}
