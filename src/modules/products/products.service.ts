import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { UserModel } from '@model/user.model';
import { ProductsEntity } from './products.entity';
import { QueryRunner } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async findAll() {
    return await this.productsRepository.find({
      where: {
        deleted_at: null,
      },
    });
  }

  // transaction rollback when error
  async createProductsT({
    user,
    products,
    queryRunner,
  }: {
    queryRunner: QueryRunner;
    user: UserModel;
    products: Partial<ProductsEntity>;
  }) {
    const newProducts = await queryRunner.manager.create(ProductsEntity, {
      ...products,
      update_by: user,
      create_by: user,
    });
    await queryRunner.manager.save(newProducts);
    return newProducts;
  }
}
