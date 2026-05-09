import { UserEntity } from '../entities/user.entity';

export interface FindUsersRepository {
  execute(): Promise<UserEntity[]>;
}
