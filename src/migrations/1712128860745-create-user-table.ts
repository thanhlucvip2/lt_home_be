import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInventoryTable1712128860745 implements MigrationInterface {
  name = 'CreateInventoryTable1712128860745';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE inventory (
        id INT PRIMARY KEY AUTO_INCREMENT,
        
        create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT email_unique UNIQUE (email)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS inventory`);
  }
}
