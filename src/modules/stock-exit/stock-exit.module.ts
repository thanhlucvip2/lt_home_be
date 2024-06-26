import { Module } from '@nestjs/common';
import { StockExitService } from './stock-exit.service';
import { StockExitRepository } from './stock-exit.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockExitEntity } from './stock-exit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockExitEntity])],
  providers: [StockExitService, StockExitRepository],
})
export class StockExitModule {}
