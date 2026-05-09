import { GreetingUsecase } from './greeting.usecase';

describe('GreetingUsecase', () => {
  let usecase: GreetingUsecase;

  beforeEach(() => {
    usecase = new GreetingUsecase();
  });

  it('should return Hello World message', () => {
    const result = usecase.execute();
    expect(result.message).toBe('Hello World!');
  });
});
