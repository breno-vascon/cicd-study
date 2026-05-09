import { Injectable } from '@nestjs/common';
import { IGreetingUsecase, GreetingOutput } from './greeting.types';

@Injectable()
export class GreetingUsecase implements IGreetingUsecase {
  execute(): GreetingOutput {
    return { message: 'Hello World!!!' };
  }
}
