import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from '../../../presentation/users/users.controller';
import { CreateUserUsecaseProvider } from '../../providers/users/create-user.usecase.provider';
import { FindUsersUsecaseProvider } from '../../providers/users/find-users.usecase.provider';
import { User, UserSchema } from '../../../infra/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [CreateUserUsecaseProvider, FindUsersUsecaseProvider],
  exports: [CreateUserUsecaseProvider, FindUsersUsecaseProvider],
})
export class UsersModule { }
