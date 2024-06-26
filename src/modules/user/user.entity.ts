import { BillingEntryEntity } from '@modules/billing-entry/billing-entry.entity';
import { BillingExitEntity } from '@modules/billing-exit/billing-exit.entity';
import { CustomersEntity } from '@modules/customers/customers.entity';
import { ProductPricingEntity } from '@modules/product_pricing/product_pricing.entity';
import { ProductsEntity } from '@modules/products/products.entity';
import { SuppliersEntity } from '@modules/suppliers/suppliers.entity';
import { BaseEntity } from '@utils/base-entity';
import { ROLE } from '@utils/enums';
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

  @Column({ type: 'int', default: ROLE.USER.VALUE })
  role: Role;

  // products relation
  @OneToMany(
    () => ProductsEntity,
    (products_entity) => products_entity.create_by,
  )
  create_products: ProductsEntity[];

  @OneToMany(
    () => ProductsEntity,
    (products_entity) => products_entity.update_by,
  )
  update_products: ProductsEntity[];

  // product_pricing relation
  @OneToMany(
    () => ProductPricingEntity,
    (products_pricing_entity) => products_pricing_entity.create_by,
  )
  create_products_pricing: ProductPricingEntity[];

  @OneToMany(
    () => ProductPricingEntity,
    (products_pricing_entity) => products_pricing_entity.update_by,
  )
  update_products_pricing: ProductPricingEntity[];

  // customer relation
  @OneToMany(
    () => CustomersEntity,
    (customers_entity) => customers_entity.create_by,
  )
  create_customers: CustomersEntity[];

  @OneToMany(
    () => CustomersEntity,
    (product_pricing_entity) => product_pricing_entity.update_by,
  )
  update_customers: CustomersEntity[];

  // suppliers relation
  @OneToMany(
    () => SuppliersEntity,
    (suppliers_entity) => suppliers_entity.create_by,
  )
  create_suppliers: SuppliersEntity[];

  @OneToMany(
    () => SuppliersEntity,
    (product_pricing_entity) => product_pricing_entity.update_by,
  )
  update_suppliers: SuppliersEntity[];

  // billing entry relation
  @OneToMany(
    () => BillingEntryEntity,
    (billing_entry_entity) => billing_entry_entity.update_by,
  )
  create_billing_entries: BillingEntryEntity[];

  @OneToMany(
    () => BillingEntryEntity,
    (billing_entry_entity) => billing_entry_entity.update_by,
  )
  update_billing_entries: BillingEntryEntity[];

  // billing exit relation
  @OneToMany(
    () => BillingExitEntity,
    (billing_exit_entity) => billing_exit_entity.update_by,
  )
  create_billing_exits: BillingExitEntity[];

  @OneToMany(
    () => BillingExitEntity,
    (billing_exit_entity) => billing_exit_entity.update_by,
  )
  update_billing_exits: BillingExitEntity[];
}
