import { CreateUserUsecase } from './create-user.usecase';
import { CreateUserRepository } from '../../repositories/create-user.repository';

describe('CreateUserUsecase', () => {
  let usecase: CreateUserUsecase;
  let repository: jest.Mocked<CreateUserRepository>;

  beforeEach(() => {
    repository = {
      execute: jest.fn(),
    };
    usecase = new CreateUserUsecase(repository);
  });

  it('should create a user and return it', async () => {
    repository.execute.mockResolvedValue({
      id: '123',
      name: 'John',
      email: 'john@email.com',
    });

    const result = await usecase.execute({ name: 'John', email: 'john@email.com' });

    expect(result).toEqual({ id: '123', name: 'John', email: 'john@email.com' });
    expect(repository.execute).toHaveBeenCalledWith({ name: 'John', email: 'john@email.com' });
  });
});
