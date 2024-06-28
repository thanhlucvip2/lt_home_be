import { AutoMap } from '@automapper/classes';
import { InventoryEntity } from '@modules/inventory/inventory.entity';
import { StockEntryEntity } from '@modules/stock-entry/stock-entry.entity';
import { UserEntity } from '@modules/user/user.entity';
import { BaseEntity } from '@utils/base-entity';
import { STATUS_PRODUCTS } from '@utils/enums';
import { StatusProducts } from '@utils/types';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('products')
export class ProductsEntity extends BaseEntity {
  @AutoMap()
  @Column({ type: 'int', unique: true, default: 0 })
  sku: number;

  @AutoMap()
  @Column({ type: 'varchar' })
  product_name: string;

  @AutoMap()
  @Column({ type: 'varchar' })
  description: string;

  @AutoMap()
  @Column({ type: 'int' })
  weight: number;

  @AutoMap()
  @Column({ type: 'varchar' })
  size: string;

  @AutoMap()
  @Column({ type: 'int', default: STATUS_PRODUCTS.ENABLE.VALUE })
  status?: StatusProducts;

  @OneToOne(
    () => InventoryEntity,
    (inventory_entity) => inventory_entity.product_id,
  )
  @JoinColumn({
    name: 'inventory_id',
  })
  inventory_id?: InventoryEntity;

  @OneToMany(
    () => StockEntryEntity,
    (stock_entry_entity) => stock_entry_entity.product_id,
  )
  stock_entries: StockEntryEntity[];

  @AutoMap()
  @ManyToOne(() => UserEntity, (user_entity) => user_entity.create_products)
  @JoinColumn({
    name: 'create_by',
  })
  create_by: UserEntity;

  @AutoMap()
  @ManyToOne(() => UserEntity, (user_entity) => user_entity.update_products)
  @JoinColumn({
    name: 'update_by',
  })
  update_by: UserEntity;
}
