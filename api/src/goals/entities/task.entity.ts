import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  JoinColumn,
} from 'typeorm';
import { Goal } from './goals.entity';

@Entity('tasks')
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  task_title: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => Goal, (goal) => goal.tasks, { onDelete: 'CASCADE' })
  @JoinColumn()
  goal: Goal;
}
