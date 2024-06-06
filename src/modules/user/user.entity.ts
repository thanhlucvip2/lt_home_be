import { BaseEntity } from '@utils/base-entity';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  first_name: string;

  @Column({ type: 'varchar' })
  last_name: string;

  @Column({ type: 'int' })
  role: number;
}
