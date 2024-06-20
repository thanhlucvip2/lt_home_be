import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @Column({ type: 'text', nullable: true })
  note?: string;
}
