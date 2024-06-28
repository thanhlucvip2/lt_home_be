import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductsEntity } from './products.entity';
import { In, IsNull, QueryRunner } from 'typeorm';
import { getDateNowTimeZone } from '@utils/date-time';
import { UserEntity } from '@modules/user/user.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async find({ ids, relations }: { ids: number[]; relations?: string[] }) {
    return await this.productsRepository.find({
      where: {
        id: In(ids),
        deleted_at: IsNull(),
      },
      relations: relations ? [...relations] : null,
    });
  }

  // transaction rollback when error
  async createT({
    user,
    products,
    queryRunner,
  }: {
    queryRunner: QueryRunner;
    user: UserEntity;
    products: Partial<ProductsEntity>;
  }) {
    const newProducts = queryRunner.manager.create(ProductsEntity, {
      ...products,
      updated_at: getDateNowTimeZone(),
      created_at: getDateNowTimeZone(),
      update_by: user,
      create_by: user,
    });
    await queryRunner.manager.save(newProducts);
    return newProducts;
  }

  async deleteT({
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

  async updateT({
    user,
    queryRunner,
    payload,
    id,
  }: {
    queryRunner: QueryRunner;
    user: UserEntity;
    id: number;
    payload: Partial<ProductsEntity>;
  }) {
    await queryRunner.manager.update(ProductsEntity, id, {
      ...payload,
      updated_at: getDateNowTimeZone(),
      update_by: user,
    });

    return null;
  }

  async updateListT({
    user,
    queryRunner,
    payload,
  }: {
    queryRunner: QueryRunner;
    user: UserEntity;
    payload: Partial<ProductsEntity>[];
  }) {
    for (let index = 0; index < payload.length; index++) {
      await queryRunner.manager.update(ProductsEntity, payload[index].id, {
        ...payload[index],
        updated_at: getDateNowTimeZone(),
        update_by: user,
      });
    }

    return null;
  }
}
