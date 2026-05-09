import { Module } from '@nestjs/common';
import { HealthController } from '../../../presentation/health/health.controller';
import { HealthUsecaseProvider } from '../../providers/health/health.usecase.provider';

@Module({
  controllers: [HealthController],
  providers: [HealthUsecaseProvider],
  exports: [HealthUsecaseProvider],
})
export class HealthModule { }
