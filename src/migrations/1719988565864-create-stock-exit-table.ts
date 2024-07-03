import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStockExitTable1719988565864 implements MigrationInterface {
  name = 'CreateStockExitTable1719988565864';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE stock_exit (
                id int NOT NULL AUTO_INCREMENT,
                created_at datetime NOT NULL,
                updated_at datetime NOT NULL,
                deleted_at datetime DEFAULT NULL,
                quantity int NOT NULL,
                total_price int NOT NULL,
                export_price int NOT NULL,
                product_id int DEFAULT NULL,
                billing_entry_id int DEFAULT NULL,
                PRIMARY KEY (id),
                FOREIGN KEY (billing_entry_id) REFERENCES billing_exit (id),
                FOREIGN KEY (product_id) REFERENCES products (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS stock_exit`);
  }
}
