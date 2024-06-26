import { Repository } from 'typeorm';
import { StockExitEntity } from './stock-exit.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class StockExitRepository extends Repository<StockExitEntity> {
  constructor(
    @InjectRepository(StockExitEntity)
    stockExitRepository: Repository<StockExitEntity>,
  ) {
    super(
      stockExitRepository.target,
      stockExitRepository.manager,
      stockExitRepository.queryRunner,
    );
  }
}
