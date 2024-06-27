import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductsEntity } from './products.entity';
import { QueryRunner } from 'typeorm';
import { getDateNowTimeZone } from '@utils/date-time';
import { UserEntity } from '@modules/user/user.entity';

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
    user: UserEntity;
    products: Partial<ProductsEntity>;
  }) {
    const newProducts = await queryRunner.manager.create(ProductsEntity, {
      ...products,
      updated_at: getDateNowTimeZone(),
      created_at: getDateNowTimeZone(),
      update_by: user,
      create_by: user,
    });
    await queryRunner.manager.save(newProducts);
    return newProducts;
  }

  async deleteProductsT({
    user,
    ids,
    queryRunner,
  }: {
    queryRunner: QueryRunner;
    user: UserEntity;
    ids: number[];
  }) {
    await queryRunner.manager.update(ProductsEntity, ids, {
      deleted_at: getDateNowTimeZone(),
      update_by: user,
    });
    return null;
  }

  async updateProductsT({
    user,
    queryRunner,
    payload,
    ids,
  }: {
    queryRunner: QueryRunner;
    user: UserEntity;
    ids: number[];
    payload: ProductsEntity[];
  }) {
    await queryRunner.manager.update(ProductsEntity, ids, {
      ...payload,
      updated_at: getDateNowTimeZone(),
      update_by: user,
    });

    return null;
  }
}
