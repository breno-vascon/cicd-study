import { FindUsersUsecase } from './find-users.usecase';
import { FindUsersRepository } from '../../repositories/find-users.repository';

describe('FindUsersUsecase', () => {
  let usecase: FindUsersUsecase;
  let repository: jest.Mocked<FindUsersRepository>;

  beforeEach(() => {
    repository = {
      execute: jest.fn(),
    };
    usecase = new FindUsersUsecase(repository);
  });

  it('should return all users', async () => {
    repository.execute.mockResolvedValue([
      { id: '1', name: 'John', email: 'john@email.com' },
      { id: '2', name: 'Jane', email: 'jane@email.com' },
    ]);

    const result = await usecase.execute();

    expect(result).toEqual([
      { id: '1', name: 'John', email: 'john@email.com' },
      { id: '2', name: 'Jane', email: 'jane@email.com' },
    ]);
  });
});
