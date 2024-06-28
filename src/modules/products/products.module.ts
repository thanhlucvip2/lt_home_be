import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsService } from './products.service';
import { ProductsEntity } from './products.entity';
import { ProductsRepository } from './products.repository';
import { ProductsController } from './products.controller';
import { CreateProductsFeature } from './features/create-products-feature/create-products.feature';
import { GetProductsFeature } from './features/get-products-feature/get-products.feature';
import { GetProductsProfile } from './mapper/get-products/get-products-profile';
import { CreateProductsProfile } from './mapper/create-products/create-products-profile';
import { DeleteProductsFeature } from './features/delete-products-feature/delete-products.feature';
import { InventoryModule } from '@modules/inventory/inventory.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity]), InventoryModule],
  providers: [
    ProductsService,
    ProductsRepository,

    // mapper
    GetProductsProfile,
    CreateProductsProfile,

    // feature service
    CreateProductsFeature,
    GetProductsFeature,
    DeleteProductsFeature,
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
