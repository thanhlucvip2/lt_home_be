import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductPricingService } from './product_pricing.service';
import { ProductPricingRepository } from './product_pricing.repository';
import { ProductPricingEntity } from './product_pricing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPricingEntity])],
  providers: [ProductPricingService, ProductPricingRepository],
})
export class ProductPricingModule {}
