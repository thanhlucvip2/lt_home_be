import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCustomersTable1719987684607 implements MigrationInterface {
  name = 'CreateCustomersTable1719987684607';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
           CREATE TABLE customers (
            id int NOT NULL AUTO_INCREMENT,
            created_at datetime NOT NULL,
            updated_at datetime NOT NULL,
            deleted_at datetime DEFAULT NULL,
            customer_name varchar(255) NOT NULL,
            email varchar(255) NOT NULL,
            address varchar(255) NOT NULL,
            contact_number int NOT NULL,
            create_by int DEFAULT NULL,
            update_by int DEFAULT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (create_by) REFERENCES user (id),
            FOREIGN KEY (update_by) REFERENCES user (id)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS customers`);
  }
}
