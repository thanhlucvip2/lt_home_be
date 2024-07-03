import { UserEntity } from '@modules/user/user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { UserService } from '../modules/user/user.service';
import { getDateNowTimeZone } from '@utils/date-time';

@Injectable()
export class CreateUserCommand {
  constructor(private readonly userService: UserService) {}
  @Command({
    command: 'create-user:data',
    describe: 'Generate data user',
  })
  async handle() {
    const dataCreate: Partial<UserEntity>[] = [
      {
        created_at: getDateNowTimeZone(),
        updated_at: getDateNowTimeZone(),
        email: 'admin@lthome.com',
        password:
          '$2a$10$PTqroDeNBFkIncryZMtyjuCzDjn4WTNxJ6gx9hKjI6AaUCqevk5cC',
        first_name: '1',
        last_name: 'admin',
        role: 1,
      },
      {
        created_at: getDateNowTimeZone(),
        updated_at: getDateNowTimeZone(),
        email: 'admin1@lthome.com',
        password:
          '$2a$10$PTqroDeNBFkIncryZMtyjuCzDjn4WTNxJ6gx9hKjI6AaUCqevk5cC',
        first_name: '1',
        last_name: 'admin',
        role: 1,
      },
    ];

    await this.userService.createManyData(dataCreate);

    Logger.log(
      '',
      '===============================================================',
    );
    Logger.log('Finish insert data dummy to user');
    Logger.log(
      '',
      '===============================================================',
    );
  }
}
