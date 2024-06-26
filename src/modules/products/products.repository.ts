import { Repository } from 'typeorm';
import { ProductsEntity } from './products.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class ProductsRepository extends Repository<ProductsEntity> {
  constructor(
    @InjectRepository(ProductsEntity)
    productsRepository: Repository<ProductsEntity>,
  ) {
    super(
      productsRepository.target,
      productsRepository.manager,
      productsRepository.queryRunner,
    );
  }
}
