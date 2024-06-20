import { Repository } from 'typeorm';
import { ProductsEntity } from './products.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class UserRepository extends Repository<ProductsEntity> {
  constructor(
    @InjectRepository(ProductsEntity)
    userRepository: Repository<ProductsEntity>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }
}
