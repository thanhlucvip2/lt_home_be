import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductsTable1719987565864 implements MigrationInterface {
  name = 'CreateProductsTable1719987565864';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE products (
        id int NOT NULL AUTO_INCREMENT,
        created_at datetime NOT NULL,
        updated_at datetime NOT NULL,
        deleted_at datetime DEFAULT NULL,
        sku int NOT NULL DEFAULT '0' UNIQUE,
        product_name varchar(255) NOT NULL,
        description varchar(255) NOT NULL,
        weight int NOT NULL,
        size varchar(255) NOT NULL,
        inventory_id int DEFAULT NULL UNIQUE,
        create_by int DEFAULT NULL,
        update_by int DEFAULT NULL,
        status int NOT NULL DEFAULT '0',
        PRIMARY KEY (id),
        FOREIGN KEY (inventory_id) REFERENCES inventory (id),
        FOREIGN KEY (create_by) REFERENCES user (id),
        FOREIGN KEY (update_by) REFERENCES user (id)
        ) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
     `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS products`);
  }
}
