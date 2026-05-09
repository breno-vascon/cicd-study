import { Injectable } from '@nestjs/common';
import { IHealthUsecase, HealthOutput } from './health.types';

@Injectable()
export class HealthUsecase implements IHealthUsecase {
  execute(): HealthOutput {
    return { message: 'ok' };
  }
}
