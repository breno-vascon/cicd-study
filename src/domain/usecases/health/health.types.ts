export const IHealthUsecaseSymbol = Symbol('IHealthUsecaseSymbol');

export interface HealthOutput {
  message: string;
}

export interface IHealthUsecase {
  execute(): HealthOutput;
}
