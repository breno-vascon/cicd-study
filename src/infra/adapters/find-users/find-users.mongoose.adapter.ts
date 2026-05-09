import { Model } from 'mongoose';
import { FindUsersRepository } from '../../../domain/repositories/find-users.repository';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserDocument } from '../../schemas/user.schema';

export class FindUsersMongooseAdapter implements FindUsersRepository {
  constructor(private readonly model: Model<UserDocument>) { }

  async execute(): Promise<UserEntity[]> {
    const users = await this.model.find().exec();
    return users.map((user) => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    }));
  }
}
