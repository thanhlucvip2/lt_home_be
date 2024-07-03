import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  createManyData(dataInsert: Partial<UserEntity>[]) {
    return this.userRepository
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values(dataInsert)
      .execute();
  }
}
