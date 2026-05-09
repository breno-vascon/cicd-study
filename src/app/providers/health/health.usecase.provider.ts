import { Provider } from '@nestjs/common';
import { IHealthUsecaseSymbol } from '../../../domain/usecases/health/health.types';
import { HealthUsecase } from '../../../domain/usecases/health/health.usecase';

export const HealthUsecaseProvider: Provider = {
  provide: IHealthUsecaseSymbol,
  useClass: HealthUsecase,
};
