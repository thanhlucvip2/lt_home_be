import { Module } from '@nestjs/common';
import { BillingEntryService } from './billing-entry.service';
import { BillingEntryRepository } from './billing-entry.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingEntryEntity } from './billing-entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BillingEntryEntity])],
  providers: [BillingEntryService, BillingEntryRepository],
})
export class BillingEntryModule {}
