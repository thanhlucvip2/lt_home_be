import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductsService } from '../../products.service';
import { ProductsRepository } from '../../products.repository';

import { CreateProductsMapper } from '@modules/products/mapper/create-products/create-products.mapper';
import { UserEntity } from '@modules/user/user.entity';
import { InventoryService } from '@modules/inventory/inventory.service';

@Injectable()
export class CreateProductsFeature {
  constructor(
    private readonly productsService: ProductsService,
    private readonly inventoryService: InventoryService,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async create({
    user,
    payload,
  }: {
    user: UserEntity;
    payload: CreateProductsMapper;
  }) {
    // create queryRunner
    const queryRunner =
      await this.productsRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      // create products
      const newProducts = await this.productsService.createT({
        queryRunner,
        user,
        products: payload,
      });

      // create inventory
      const newInventory = await this.inventoryService.createT({
        queryRunner,
        products: newProducts,
      });

      // update products id
      await this.productsService.updateT({
        queryRunner,
        user,
        id: newProducts.id,
        payload: {
          sku: 10000 + newProducts.id,
          inventory_id: newInventory,
        },
      });

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
    return null;
  }
}
