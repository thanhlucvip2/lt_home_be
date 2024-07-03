import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStockExitTable1719989555533 implements MigrationInterface {
  name = 'CreateStockExitTable1719989555533';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
     CREATE TABLE stock_entry (
      id int NOT NULL AUTO_INCREMENT,
      created_at datetime NOT NULL,
      updated_at datetime NOT NULL,
      deleted_at datetime DEFAULT NULL,
      quantity int NOT NULL,
      total_price int NOT NULL,
      import_price int NOT NULL,
      product_id int DEFAULT NULL,
      billing_entry_id int DEFAULT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (product_id) REFERENCES products (id),
      FOREIGN KEY (billing_entry_id) REFERENCES billing_entry (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
     `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS stock_entry`);
  }
}
