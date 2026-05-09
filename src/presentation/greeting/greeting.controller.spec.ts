import { Test, TestingModule } from '@nestjs/testing';
import { GreetingController } from './greeting.controller';
import { IGreetingUsecaseSymbol } from '../../domain/usecases/greeting/greeting.types';
import { GreetingUsecase } from '../../domain/usecases/greeting/greeting.usecase';

describe('GreetingController', () => {
  let controller: GreetingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GreetingController],
      providers: [
        {
          provide: IGreetingUsecaseSymbol,
          useClass: GreetingUsecase,
        },
      ],
    }).compile();

    controller = module.get<GreetingController>(GreetingController);
  });

  it('should return "Hello World!"', () => {
    expect(controller.getHello()).toBe('Hello World!');
  });
});
