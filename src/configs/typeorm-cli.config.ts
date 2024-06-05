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

export default new DataSource({
  type: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: DB_LOGGING,
  migrations: [CreateUserTable1712128860745],
});
