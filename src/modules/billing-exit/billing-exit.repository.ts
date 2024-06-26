import { Repository } from 'typeorm';
import { BillingExitEntity } from './billing-exit.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class BillingExitRepository extends Repository<BillingExitEntity> {
  constructor(
    @InjectRepository(BillingExitEntity)
    billingExitRepository: Repository<BillingExitEntity>,
  ) {
    super(
      billingExitRepository.target,
      billingExitRepository.manager,
      billingExitRepository.queryRunner,
    );
  }
}
