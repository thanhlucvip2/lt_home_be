import { BaseEntity } from '@utils/base-entity';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 20 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', length: 20 })
  first_name: string;

  @Column({ type: 'varchar', length: 20 })
  last_name: string;
}
