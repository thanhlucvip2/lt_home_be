import { ProductsEntity } from '@modules/products/products.entity';
import { UserEntity } from '@modules/user/user.entity';
import { BaseEntity } from '@utils/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('product_pricing')
export class ProductPricingEntity extends BaseEntity {
  @Column({ type: 'int' })
  export_price: number;

  @Column({ type: 'int' })
  import_price: number;

  @Column({ type: 'int' })
  selling_price: number;

  @OneToOne(
    () => ProductsEntity,
    (products_entity) => products_entity.inventory_id,
  )
  @JoinColumn({
    name: 'product_id',
  })
  product_id: ProductsEntity;

  @ManyToOne(() => UserEntity, (user_entity) => user_entity.create_products)
  @JoinColumn({
    name: 'create_by',
  })
  create_by: UserEntity;

  @ManyToOne(() => UserEntity, (user_entity) => user_entity.update_products)
  @JoinColumn({
    name: 'update_by',
  })
  update_by: UserEntity;
}
