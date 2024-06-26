import { BillingEntryEntity } from '@modules/billing-entry/billing-entry.entity';
import { UserEntity } from '@modules/user/user.entity';
import { BaseEntity } from '@utils/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('suppliers')
export class SuppliersEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  supplier_name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'int' })
  contact_number: number;

  @OneToMany(
    () => BillingEntryEntity,
    (billing_entries) => billing_entries.supplier_id,
  )
  billing_entries: BillingEntryEntity[];

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
