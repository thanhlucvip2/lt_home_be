import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1712128860745 implements MigrationInterface {
  name = 'CreateUserTable1712128860745';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE user (
        id INT PRIMARY KEY AUTO_INCREMENT,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role INT DEFAULT 1,
        create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT email_unique UNIQUE (email)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS user`);
  }
}
