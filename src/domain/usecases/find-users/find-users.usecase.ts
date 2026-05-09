import { Injectable } from '@nestjs/common';
import { IFindUsersUsecase, FindUsersOutput } from './find-users.types';
import type { FindUsersRepository } from '../../repositories/find-users.repository';

@Injectable()
export class FindUsersUsecase implements IFindUsersUsecase {
  constructor(private readonly findUsersRepository: FindUsersRepository) {}

  async execute(): Promise<FindUsersOutput[]> {
    const users = await this.findUsersRepository.execute();

    return users.map((user) => ({
      id: user.id!,
      name: user.name,
      email: user.email,
    }));
  }
}
