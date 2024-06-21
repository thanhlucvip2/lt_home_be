import { Repository } from 'typeorm';
import { CustomersEntity } from './customers.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class CustomersRepository extends Repository<CustomersEntity> {
  constructor(
    @InjectRepository(CustomersEntity)
    customersRepository: Repository<CustomersEntity>,
  ) {
    super(
      customersRepository.target,
      customersRepository.manager,
      customersRepository.queryRunner,
    );
  }
}
