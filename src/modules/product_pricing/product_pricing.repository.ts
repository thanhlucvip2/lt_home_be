import { Repository } from 'typeorm';
import { ProductPricingEntity } from './product_pricing.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class ProductPricingRepository extends Repository<ProductPricingEntity> {
  constructor(
    @InjectRepository(ProductPricingEntity)
    productPricingRepository: Repository<ProductPricingEntity>,
  ) {
    super(
      productPricingRepository.target,
      productPricingRepository.manager,
      productPricingRepository.queryRunner,
    );
  }
}
