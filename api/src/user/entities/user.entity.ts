import { Entity, Column, OneToMany } from 'typeorm';
import { Goal } from '../../goals/entities/goals.entity';
import { BaseEntity } from '../../base-model/entities/base-model.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Goal, (goal) => goal.user)
  goals: Goal[];
}
