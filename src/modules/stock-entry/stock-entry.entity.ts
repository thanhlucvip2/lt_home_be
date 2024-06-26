import { BillingEntryEntity } from '@modules/billing-entry/billing-entry.entity';
import { ProductsEntity } from '@modules/products/products.entity';
import { BaseEntity } from '@utils/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('stock_entry')
export class StockEntryEntity extends BaseEntity {
  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'int' })
  total_price: number;

  @Column({ type: 'int' })
  import_price: number;

  @ManyToOne(
    () => ProductsEntity,
    (products_entity) => products_entity.stock_entries,
  )
  @JoinColumn({
    name: 'product_id',
  })
  product_id: ProductsEntity;

  @ManyToOne(
    () => BillingEntryEntity,
    (billing_entry_entity) => billing_entry_entity.stock_entries,
  )
  @JoinColumn({
    name: 'billing_entry_id',
  })
  billing_entry_id: BillingEntryEntity;
}
