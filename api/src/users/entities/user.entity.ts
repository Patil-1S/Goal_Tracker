import { Entity, Column, OneToMany } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { BaseEntity } from '../../base-model/entities/base-model.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  //   @PrimaryGeneratedColumn()
  //   id: number;

  @Column()
  name: string;

  @Column()
  mobile: number;

  @Column()
  gender: string;

  @Column()
  country: string;

  @Column()
  hobbies: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
