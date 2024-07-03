import { CustomersEntity } from '@modules/customers/customers.entity';
import { StockExitEntity } from '@modules/stock-exit/stock-exit.entity';
import { UserEntity } from '@modules/user/user.entity';
import { BaseEntity } from '@utils/base-entity';
import { STATUS_BILLING_EXIT } from '@utils/enums';
import { StatusBillingExit } from '@utils/types';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('billing_exit')
export class BillingExitEntity extends BaseEntity {
  @Column({ type: 'int' })
  total_price: number;

  @Column({ type: 'int' })
  sale: number;

  @Column({ type: 'int', default: STATUS_BILLING_EXIT.CREATE.VALUE })
  status: StatusBillingExit;

  @ManyToOne(
    () => CustomersEntity,
    (customer_entity) => customer_entity.billing_exits,
  )
  @JoinColumn({
    name: 'customer_id',
  })
  customer_id: number;

  @OneToMany(
    () => StockExitEntity,
    (stock_exit_entity) => stock_exit_entity.billing_exit_id,
  )
  stock_exits: StockExitEntity[];

  @ManyToOne(
    () => UserEntity,
    (user_entity) => user_entity.create_billing_exits,
  )
  @JoinColumn({
    name: 'create_by',
  })
  create_by: UserEntity;

  @ManyToOne(
    () => UserEntity,
    (user_entity) => user_entity.update_billing_exits,
  )
  @JoinColumn({
    name: 'update_by',
  })
  update_by: UserEntity;
}
