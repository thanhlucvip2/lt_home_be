import { Repository } from 'typeorm';
import { BillingEntryEntity } from './billing-entry.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class BillingEntryRepository extends Repository<BillingEntryEntity> {
  constructor(
    @InjectRepository(BillingEntryEntity)
    billingEntryRepository: Repository<BillingEntryEntity>,
  ) {
    super(
      billingEntryRepository.target,
      billingEntryRepository.manager,
      billingEntryRepository.queryRunner,
    );
  }
}
