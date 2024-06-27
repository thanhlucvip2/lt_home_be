import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsService } from './products.service';
import { ProductsEntity } from './products.entity';
import { ProductsRepository } from './products.repository';
import { ProductsController } from './products.controller';
import { CreateProductFeature } from './features/create-products-feature/create-product.feature';
import { GetProductsFeature } from './features/get-products-feature/get-products.feature';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity])],
  providers: [
    ProductsService,

    ProductsRepository,

    CreateProductFeature,
    GetProductsFeature,
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
