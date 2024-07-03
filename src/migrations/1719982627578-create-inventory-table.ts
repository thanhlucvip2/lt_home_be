import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInventoryTable1719982627578 implements MigrationInterface {
  name = 'CreateInventoryTable1719982627578';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE inventory (
        id int NOT NULL AUTO_INCREMENT,
        created_at datetime NOT NULL,
        updated_at datetime NOT NULL,
        deleted_at datetime DEFAULT NULL,
        quantity int NOT NULL,
        product_id int DEFAULT NULL UNIQUE,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS inventory`);
  }
}
