export const ICreateUserUsecaseSymbol = Symbol('ICreateUserUsecaseSymbol');

export interface CreateUserInput {
  name: string;
  email: string;
}

export interface CreateUserOutput {
  id: string;
  name: string;
  email: string;
}

export interface ICreateUserUsecase {
  execute(input: CreateUserInput): Promise<CreateUserOutput>;
}
