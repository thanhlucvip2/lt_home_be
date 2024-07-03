import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';

import { CryptoKeyCommand } from './crypto-key.command';
import { CreateUserCommand } from './create-user-data.command';
import { UserModule } from '@modules/user/user.module';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [CommandModule, DatabaseModule, UserModule],
  providers: [CryptoKeyCommand, CreateUserCommand],
})
export class AppCommandModule {}
