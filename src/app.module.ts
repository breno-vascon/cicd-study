import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './app/modules/infra/database.module';
import { GreetingModule } from './app/modules/features/greeting.module';
import { HealthModule } from './app/modules/features/health.module';
import { UsersModule } from './app/modules/features/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    GreetingModule,
    HealthModule,
    UsersModule,
  ],
})
export class AppModule { }
