import { StockExitEntity } from '@modules/stock-exit/stock-exit.entity';
import { SuppliersEntity } from '@modules/suppliers/suppliers.entity';
import { UserEntity } from '@modules/user/user.entity';
import { BaseEntity } from '@utils/base-entity';
import { STATUS_BILLING_ENTRY } from '@utils/enums';
import { StatusBillingEntry } from '@utils/types';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('billing_entry')
export class BillingEntryEntity extends BaseEntity {
  @Column({ type: 'int' })
  total_price: number;

  @Column({ type: 'int' })
  sale: number;

  @Column({ type: 'int', default: STATUS_BILLING_ENTRY.CREATE.VALUE })
  status: StatusBillingEntry;

  @ManyToOne(
    () => SuppliersEntity,
    (suppliers_entity) => suppliers_entity.billing_entries,
  )
  @JoinColumn({
    name: 'supplier_id',
  })
  supplier_id: number;

  @OneToMany(
    () => StockExitEntity,
    (stock_exit_entity) => stock_exit_entity.billing_exit_id,
  )
  stock_entries: StockExitEntity[];

  @ManyToOne(
    () => UserEntity,
    (user_entity) => user_entity.create_billing_entries,
  )
  @JoinColumn({
    name: 'create_by',
  })
  create_by: UserEntity;

  @ManyToOne(
    () => UserEntity,
    (user_entity) => user_entity.update_billing_entries,
  )
  @JoinColumn({
    name: 'update_by',
  })
  update_by: UserEntity;
}
