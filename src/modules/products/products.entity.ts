import { UserEntity } from '@modules/user/user.entity';
import { BaseEntity } from '@utils/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('products')
export class ProductsEntity extends BaseEntity {
  @Column({ type: 'int', unique: true })
  sku: number;

  @Column({ type: 'varchar' })
  product_name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'int' })
  weight: number;

  @Column({ type: 'varchar' })
  size: string;

  @ManyToOne(() => UserEntity, (user_entity) => user_entity.create_products)
  create_by: UserEntity;

  @ManyToOne(() => UserEntity, (user_entity) => user_entity.update_products)
  update_by: UserEntity;
}
