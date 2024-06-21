import { Repository } from 'typeorm';
import { InventoryEntity } from './inventory.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class InventoryRepository extends Repository<InventoryEntity> {
  constructor(
    @InjectRepository(InventoryEntity)
    userRepository: Repository<InventoryEntity>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }
}
