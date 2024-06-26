import { BillingExitEntity } from '@modules/billing-exit/billing-exit.entity';
import { UserEntity } from '@modules/user/user.entity';
import { BaseEntity } from '@utils/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('customers')
export class CustomersEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  customer_name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'int' })
  contact_number: number;

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

  @OneToMany(
    () => BillingExitEntity,
    (billing_exits) => billing_exits.customer_id,
  )
  billing_exits: BillingExitEntity[];
}
