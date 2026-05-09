import { UserEntity } from '../entities/user.entity';

export interface CreateUserRepository {
  execute(user: UserEntity): Promise<UserEntity>;
}
