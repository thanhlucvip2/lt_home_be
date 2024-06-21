import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SuppliersEntity } from './suppliers.entity';

export class SuppliersRepository extends Repository<SuppliersEntity> {
  constructor(
    @InjectRepository(SuppliersEntity)
    suppliersRepository: Repository<SuppliersEntity>,
  ) {
    super(
      suppliersRepository.target,
      suppliersRepository.manager,
      suppliersRepository.queryRunner,
    );
  }
}
