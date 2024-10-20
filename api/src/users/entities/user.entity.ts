import { Entity, Column, OneToMany } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { BaseEntity } from '../../base-model/entities/base-model.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  mobile: string;

  @Column()
  gender: string;

  @Column()
  country: string;

  @Column()
  hobbies: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
