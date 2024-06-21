import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SuppliersService } from './suppliers.service';
import { SuppliersRepository } from './suppliers.repository';
import { SuppliersEntity } from './suppliers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SuppliersEntity])],
  providers: [SuppliersService, SuppliersRepository],
})
export class SuppliersModule {}
