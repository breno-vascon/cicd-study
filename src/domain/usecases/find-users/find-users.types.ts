export const IFindUsersUsecaseSymbol = Symbol('IFindUsersUsecaseSymbol');

export interface FindUsersOutput {
  id: string;
  name: string;
  email: string;
}

export interface IFindUsersUsecase {
  execute(): Promise<FindUsersOutput[]>;
}
