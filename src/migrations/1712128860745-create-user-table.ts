import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1712128860745 implements MigrationInterface {
  name = 'CreateUserTable1712128860745';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE user (
        id INT PRIMARY KEY AUTO_INCREMENT,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        email VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        role INT DEFAULT 1,
        is_deleted BOOLEAN DEFAULT FALSE,
        created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT email_unique UNIQUE (email)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS user`);
  }
}
