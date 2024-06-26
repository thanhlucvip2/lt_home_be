import { Repository } from 'typeorm';
import { StockEntryEntity } from './stock-entry.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class StockEntryRepository extends Repository<StockEntryEntity> {
  constructor(
    @InjectRepository(StockEntryEntity)
    stockEntryRepository: Repository<StockEntryEntity>,
  ) {
    super(
      stockEntryRepository.target,
      stockEntryRepository.manager,
      stockEntryRepository.queryRunner,
    );
  }
}
