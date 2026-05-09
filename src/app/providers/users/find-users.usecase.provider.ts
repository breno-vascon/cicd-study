import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFindUsersUsecaseSymbol } from '../../../domain/usecases/find-users/find-users.types';
import { FindUsersUsecase } from '../../../domain/usecases/find-users/find-users.usecase';
import { FindUsersMongooseAdapter } from '../../../infra/adapters/find-users/find-users.mongoose.adapter';
import { User, UserDocument } from '../../../infra/schemas/user.schema';

export const FindUsersUsecaseProvider: Provider = {
  provide: IFindUsersUsecaseSymbol,
  useFactory(model: Model<UserDocument>): FindUsersUsecase {
    const findUsersRepository = new FindUsersMongooseAdapter(model);
    return new FindUsersUsecase(findUsersRepository);
  },
  inject: [getModelToken(User.name)],
};
