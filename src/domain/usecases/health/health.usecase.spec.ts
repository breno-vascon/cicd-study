import { HealthUsecase } from './health.usecase';

describe('HealthUsecase', () => {
  let usecase: HealthUsecase;

  beforeEach(() => {
    usecase = new HealthUsecase();
  });

  it('should return ok message', () => {
    const result = usecase.execute();
    expect(result.message).toBe('ok');
  });
});
