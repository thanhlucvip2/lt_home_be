import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id?: string;

  @CreateDateColumn()
  create_at?: Date;

  @UpdateDateColumn()
  update_at?: Date;
}
