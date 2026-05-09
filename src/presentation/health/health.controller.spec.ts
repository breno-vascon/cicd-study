import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { IHealthUsecaseSymbol } from '../../domain/usecases/health/health.types';
import { HealthUsecase } from '../../domain/usecases/health/health.usecase';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: IHealthUsecaseSymbol,
          useClass: HealthUsecase,
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should return { message: "Working" }', () => {
    expect(controller.check()).toEqual({ message: 'Working' });
  });
});
