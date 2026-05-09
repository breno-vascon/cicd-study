import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICreateUserUsecaseSymbol } from '../../../domain/usecases/create-user/create-user.types';
import { CreateUserUsecase } from '../../../domain/usecases/create-user/create-user.usecase';
import { CreateUserMongooseAdapter } from '../../../infra/adapters/create-user/create-user.mongoose.adapter';
import { User, UserDocument } from '../../../infra/schemas/user.schema';

export const CreateUserUsecaseProvider: Provider = {
  provide: ICreateUserUsecaseSymbol,
  useFactory(model: Model<UserDocument>): CreateUserUsecase {
    const createUserRepository = new CreateUserMongooseAdapter(model);
    return new CreateUserUsecase(createUserRepository);
  },
  inject: [getModelToken(User.name)],
};
