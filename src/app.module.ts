import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { APP_GUARD } from '@nestjs/core';

import { DatabaseModule } from '@database/database.module';
import { NoXPoweredByMiddleware } from '@middlewares/no-x-powered-by.middleware';
import { THROTTLER_LIMIT, THROTTLER_TTL } from '@utils/constants';

import { MailModule } from '@services/email/mail.module';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ProductPricingModule } from '@modules/product_pricing/product_pricing.module';
import { InventoryModule } from '@modules/inventory/inventory.module';
import { ProductsModule } from '@modules/products/products.module';
import { CustomersModule } from '@modules/customers/customers.module';
import { SuppliersModule } from '@modules/suppliers/suppliers.module';
import { StockEntryModule } from '@modules/stock-entry/stock-entry.module';
import { StockExitModule } from '@modules/stock-exit/stock-exit.module';
import { BillingExitModule } from '@modules/billing-exit/billing-exit.module';
import { BillingEntryModule } from '@modules/billing-entry/billing-entry.module';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    MailModule,
    ProductsModule,
    ProductPricingModule,
    InventoryModule,
    CustomersModule,
    SuppliersModule,
    StockEntryModule,
    StockExitModule,
    BillingExitModule,
    BillingEntryModule,
    ThrottlerModule.forRoot([
      {
        ttl: THROTTLER_TTL,
        limit: THROTTLER_LIMIT,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NoXPoweredByMiddleware).forRoutes('*');
  }
}
