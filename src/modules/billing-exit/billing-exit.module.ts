import { Module } from '@nestjs/common';
import { BillingExitService } from './billing-exit.service';
import { BillingExitRepository } from './billing-exit.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingExitEntity } from './billing-exit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BillingExitEntity])],
  providers: [BillingExitService, BillingExitRepository],
})
export class BillingExitModule {}
