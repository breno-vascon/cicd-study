import { Model } from 'mongoose';
import { CreateUserRepository } from '../../../domain/repositories/create-user.repository';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserDocument } from '../../schemas/user.schema';

export class CreateUserMongooseAdapter implements CreateUserRepository {
  constructor(private readonly model: Model<UserDocument>) { }

  async execute(user: UserEntity): Promise<UserEntity> {
    const created = await this.model.create(user);
    return {
      id: created._id.toString(),
      name: created.name,
      email: created.email,
    };
  }
}
