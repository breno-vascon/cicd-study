import { Controller, Get, Inject } from '@nestjs/common';
import type {
  IHealthUsecase,
  HealthOutput,
} from '../../domain/usecases/health/health.types';
import { IHealthUsecaseSymbol } from '../../domain/usecases/health/health.types';

@Controller('health')
export class HealthController {
  constructor(
    @Inject(IHealthUsecaseSymbol)
    private readonly healthUsecase: IHealthUsecase,
  ) {}

  @Get()
  check(): HealthOutput {
    return this.healthUsecase.execute();
  }
}
