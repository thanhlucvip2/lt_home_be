import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBillingEntryTable1719989257966
  implements MigrationInterface
{
  name = 'CreateBillingEntryTable1719989257966';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
       CREATE TABLE billing_entry (
        id int NOT NULL AUTO_INCREMENT,
        created_at datetime NOT NULL,
        updated_at datetime NOT NULL,
        deleted_at datetime DEFAULT NULL,
        total_price int NOT NULL,
        sale int NOT NULL,
        status int NOT NULL DEFAULT '0',
        supplier_id int DEFAULT NULL,
        create_by int DEFAULT NULL,
        update_by int DEFAULT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (update_by) REFERENCES user (id),
        FOREIGN KEY (create_by) REFERENCES user (id),
        FOREIGN KEY (supplier_id) REFERENCES suppliers (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS billing_entry`);
  }
}
