import { DataSource } from 'typeorm';

import {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_LOGGING,
} from './app.config';
import { CreateUserTable1712128860745 } from 'src/migrations/1712128860745-create-user-table';
import { CreateInventoryTable1719982627578 } from 'src/migrations/1719982627578-create-inventory-table';
import { CreateProductsTable1719987565864 } from 'src/migrations/1719987565864-create-products-table';
import { CreateSuppliersTable1719982627574 } from 'src/migrations/1719982627574-create-suppliers-table';
import { CreateCustomersTable1719987684607 } from 'src/migrations/1719987684607-create-customers-table';
import { CreateBillingExitTable1719988122130 } from 'src/migrations/1719988122130-create-billing-exit-table';
import { CreateStockExitTable1719988565864 } from 'src/migrations/1719988565864-create-stock-exit-table';
import { CreateBillingEntryTable1719989257966 } from 'src/migrations/1719989257966-create-billing-entry-table';
import { CreateStockExitTable1719989555533 } from 'src/migrations/1719989555533-create-stock-entry-table';
import { CrateProductPricingTable1719989870976 } from 'src/migrations/1719989870976-create-product-pricing-table';

export default new DataSource({
  type: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: DB_LOGGING,
  migrations: [
    CreateUserTable1712128860745,
    CreateInventoryTable1719982627578,
    CreateProductsTable1719987565864,
    CreateSuppliersTable1719982627574,
    CreateCustomersTable1719987684607,
    CreateBillingExitTable1719988122130,
    CreateStockExitTable1719988565864,
    CreateBillingEntryTable1719989257966,
    CreateStockExitTable1719989555533,
    CrateProductPricingTable1719989870976,
  ],
});
