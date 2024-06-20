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
}
