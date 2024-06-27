import { AutoMap } from '@automapper/classes';
import { PrimaryGeneratedColumn, Column } from 'typeorm';
export class BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id?: number;

  @AutoMap()
  @Column({ type: 'datetime', nullable: true })
  created_at?: Date;

  @AutoMap()
  @Column({ type: 'datetime' })
  updated_at: Date;

  @AutoMap()
  @Column({ type: 'datetime' })
  deleted_at: Date;
}
