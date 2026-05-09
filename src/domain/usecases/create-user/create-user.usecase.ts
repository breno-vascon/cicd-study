import { Injectable } from '@nestjs/common';
import {
  ICreateUserUsecase,
  CreateUserInput,
  CreateUserOutput,
} from './create-user.types';
import type { CreateUserRepository } from '../../repositories/create-user.repository';

@Injectable()
export class CreateUserUsecase implements ICreateUserUsecase {
  constructor(private readonly createUserRepository: CreateUserRepository) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const user = await this.createUserRepository.execute({
      name: input.name,
      email: input.email,
    });

    return {
      id: user.id!,
      name: user.name,
      email: user.email,
    };
  }
}
