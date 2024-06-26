import { Module } from '@nestjs/common';
import { StockEntryService } from './stock-entry.service';
import { StockEntryRepository } from './stock-entry.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockEntryEntity } from './stock-entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockEntryEntity])],
  providers: [StockEntryService, StockEntryRepository],
})
export class StockEntryModule {}
