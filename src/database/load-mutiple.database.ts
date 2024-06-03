import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

export const LoadMultipleDatabase = (dbs: DataSourceOptions[]) => {
  const mutilpeDatabase: DynamicModule[] = [];
  dbs.forEach((item) => {
    const typeormModule = TypeOrmModule.forRoot(item);
    mutilpeDatabase.push(typeormModule);
  });
  return mutilpeDatabase;
};
