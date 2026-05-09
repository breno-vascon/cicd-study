export const IGreetingUsecaseSymbol = Symbol('IGreetingUsecaseSymbol');

export interface GreetingOutput {
  message: string;
}

export interface IGreetingUsecase {
  execute(): GreetingOutput;
}
