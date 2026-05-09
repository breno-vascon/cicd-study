import { Provider } from '@nestjs/common';
import { IGreetingUsecaseSymbol } from '../../../domain/usecases/greeting/greeting.types';
import { GreetingUsecase } from '../../../domain/usecases/greeting/greeting.usecase';

export const GreetingUsecaseProvider: Provider = {
  provide: IGreetingUsecaseSymbol,
  useClass: GreetingUsecase,
};
