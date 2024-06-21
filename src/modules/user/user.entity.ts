import { ProductPricingEntity } from '@modules/product_pricing/product_pricing.entity';
import { ProductsEntity } from '@modules/products/products.entity';
import { BaseEntity } from '@utils/base-entity';
import { Role } from '@utils/types';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  first_name: string;

  @Column({ type: 'varchar' })
  last_name: string;

  @Column({ type: 'int' })
  role: Role;

  // products relation
  @OneToMany(
    () => ProductsEntity,
    (products_entity) => products_entity.create_by,
  )
  create_products: ProductsEntity;

  @OneToMany(
    () => ProductsEntity,
    (products_entity) => products_entity.update_by,
  )
  update_products: ProductsEntity;

  // product_pricing relation
  @OneToMany(
    () => ProductPricingEntity,
    (product_pricing_entity) => product_pricing_entity.create_by,
  )
  create_products_pricing: ProductPricingEntity;

  @OneToMany(
    () => ProductPricingEntity,
    (product_pricing_entity) => product_pricing_entity.update_by,
  )
  update_products_pricing: ProductPricingEntity;
}
