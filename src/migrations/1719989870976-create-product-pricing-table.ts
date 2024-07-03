import { MigrationInterface, QueryRunner } from 'typeorm';

export class CrateProductPricingTable1719989870976
  implements MigrationInterface
{
  name = 'CrateProductPricingTable1719989870976';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
           CREATE TABLE product_pricing (
            id int NOT NULL AUTO_INCREMENT,
            created_at datetime NOT NULL,
            updated_at datetime NOT NULL,
            deleted_at datetime DEFAULT NULL,
            export_price int NOT NULL,
            import_price int NOT NULL,
            selling_price int NOT NULL,
            product_id int DEFAULT NULL UNIQUE,
            create_by int DEFAULT NULL,
            update_by int DEFAULT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (create_by) REFERENCES user (id),
            FOREIGN KEY (update_by) REFERENCES user (id),
            FOREIGN KEY (product_id) REFERENCES products (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS product_pricing');
  }
}
