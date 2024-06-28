import { Injectable } from '@nestjs/common';
import { InventoryRepository } from './inventory.repository';
import { QueryRunner } from 'typeorm';
import { ProductsEntity } from '@modules/products/products.entity';
import { InventoryEntity } from './inventory.entity';
import { getDateNowTimeZone } from '@utils/date-time';

@Injectable()
export class InventoryService {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async createT({
    products,
    queryRunner,
  }: {
    queryRunner: QueryRunner;
    products: Partial<ProductsEntity>;
  }) {
    const newInventory = queryRunner.manager.create(InventoryEntity, {
      quantity: 0,
      product_id: products,
      updated_at: getDateNowTimeZone(),
      created_at: getDateNowTimeZone(),
    });

    await queryRunner.manager.save(newInventory);
    return newInventory;
  }
  async deleteT({
    ids,
    queryRunner,
  }: {
    queryRunner: QueryRunner;
    ids: number[];
  }) {
    await queryRunner.manager.update(InventoryEntity, ids, {
      deleted_at: getDateNowTimeZone(),
    });
    return null;
  }
}
