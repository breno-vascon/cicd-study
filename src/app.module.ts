import { Module } from '@nestjs/common';
import { GreetingModule } from './app/modules/features/greeting.module';
import { HealthModule } from './app/modules/features/health.module';

@Module({
  imports: [GreetingModule, HealthModule],
})
export class AppModule { }
