import { Repository } from 'typeorm';
import { InventoryEntity } from './inventory.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class InventoryRepository extends Repository<InventoryEntity> {
  constructor(
    @InjectRepository(InventoryEntity)
    inventoryRepository: Repository<InventoryEntity>,
  ) {
    super(
      inventoryRepository.target,
      inventoryRepository.manager,
      inventoryRepository.queryRunner,
    );
  }
}
