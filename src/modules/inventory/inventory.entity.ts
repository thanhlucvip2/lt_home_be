import { AutoMap } from '@automapper/classes';
import { ProductsEntity } from '@modules/products/products.entity';
import { BaseEntity } from '@utils/base-entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('inventory')
export class InventoryEntity extends BaseEntity {
  @AutoMap()
  @Column({ type: 'int' })
  quantity: number;

  @OneToOne(
    () => ProductsEntity,
    (products_entity) => products_entity.inventory_id,
  )
  @JoinColumn({
    name: 'product_id',
  })
  product_id: ProductsEntity;
}
