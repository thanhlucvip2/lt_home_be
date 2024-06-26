import { Module } from '@nestjs/common';
import { BillingExitService } from './billing-exit.service';

@Module({
  providers: [BillingExitService],
})
export class BillingExitModule {}
