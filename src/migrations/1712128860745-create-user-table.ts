import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1712128860745 implements MigrationInterface {
  name = 'CreateUserTable1712128860745';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE user (
      id int NOT NULL AUTO_INCREMENT,
      created_at datetime NOT NULL,
      updated_at datetime NOT NULL,
      deleted_at datetime DEFAULT NULL,
      email varchar(255) NOT NULL,
      password varchar(255) NOT NULL,
      first_name varchar(255) NOT NULL,
      last_name varchar(255) NOT NULL,
      role int NOT NULL DEFAULT '0',
      PRIMARY KEY (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS user`);
  }
}
