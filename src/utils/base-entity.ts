import { AutoMap } from '@automapper/classes';
import { PrimaryGeneratedColumn, Column } from 'typeorm';
export class BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id?: number;

  @AutoMap()
  @Column({ type: 'datetime' })
  created_at?: Date;

  @AutoMap()
  @Column({ type: 'datetime' })
  updated_at: Date;

  @AutoMap()
  @Column({ type: 'datetime', nullable: true })
  deleted_at: Date;
}
