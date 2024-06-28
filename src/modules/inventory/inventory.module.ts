import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InventoryService } from './inventory.service';
import { InventoryRepository } from './inventory.repository';
import { InventoryEntity } from './inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryEntity])],
  providers: [InventoryService, InventoryRepository],
  exports: [InventoryService],
})
export class InventoryModule {}
