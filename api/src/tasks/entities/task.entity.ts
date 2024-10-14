import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BaseEntity } from '../../base-model/entities/base-model.entity';

@Entity({ name: 'tasks' })
export class Task extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp' })
  time: Date;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
