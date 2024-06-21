import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomersService } from './customers.service';
import { CustomersRepository } from './customers.repository';
import { CustomersEntity } from './customers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomersEntity])],
  providers: [CustomersService, CustomersRepository],
})
export class CustomersModule {}
