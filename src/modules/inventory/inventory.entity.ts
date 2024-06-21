import { ProductsEntity } from '@modules/products/products.entity';
import { BaseEntity } from '@utils/base-entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('inventory')
export class InventoryEntity extends BaseEntity {
  @Column({ type: 'int', unique: true })
  sku: number;

  @Column({ type: 'int', unique: true })
  quantity: number;

  @OneToOne(
    () => ProductsEntity,
    (products_entity) => products_entity.inventory,
  )
  @JoinColumn({
    name: 'product_id',
  })
  product_id: ProductsEntity;
}
