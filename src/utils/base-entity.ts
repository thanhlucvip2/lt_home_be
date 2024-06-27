import { AutoMap } from '@automapper/classes';
import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';
export class BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id?: string;

  @AutoMap()
  @CreateDateColumn()
  created_at?: Date;

  @AutoMap()
  @UpdateDateColumn()
  updated_at?: Date;

  @AutoMap()
  @DeleteDateColumn()
  deleted_at?: Date;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  note?: string;
}
