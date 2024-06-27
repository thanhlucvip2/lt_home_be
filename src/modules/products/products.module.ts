import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsService } from './products.service';
import { ProductsEntity } from './products.entity';
import { ProductsRepository } from './products.repository';
import { ProductsController } from './products.controller';
import { CreateProductsFeature } from './features/create-products-feature/create-products.feature';
import { GetProductsFeature } from './features/get-products-feature/get-products.feature';
import { GetProductsProfile } from './mapper/get-products/get-products-profile';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity])],
  providers: [
    ProductsService,
    ProductsRepository,

    GetProductsProfile,

    CreateProductsFeature,
    GetProductsFeature,
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
