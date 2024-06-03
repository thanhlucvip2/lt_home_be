import { Module } from '@nestjs/common';
import { DBS } from './dbs.config';
import { LoadMultipleDatabase } from './load-mutiple.database';

const MultipeDatabase = LoadMultipleDatabase(DBS);
@Module({
  imports: [...MultipeDatabase],
})
export class DatabaseModule {}
