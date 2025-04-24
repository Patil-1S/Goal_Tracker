import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { BaseEntity } from '../../base-model/entities/base-model.entity';
import { Task } from './task.entity';

export enum GoalStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum GoalPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum GoalCategory {
  HEALTH = 'HEALTH',
  EDUCATION = 'EDUCATION',
  CAREER = 'CAREER',
  FINANCE = 'FINANCE',
  PERSONAL = 'PERSONAL',
  TRAVEL = 'TRAVEL',
  OTHER = 'OTHER',
}

@Entity('goals')
export class Goal extends BaseEntity {
  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: GoalStatus, default: GoalStatus.PENDING })
  status?: GoalStatus;

  @Column({ type: 'int', default: 0 })
  progress?: number;

  @Column({ type: 'timestamp', nullable: true })
  deadline?: Date;

  @Column({ type: 'enum', enum: GoalCategory, default: GoalCategory.PERSONAL })
  category?: GoalCategory;

  @Column({ type: 'enum', enum: GoalPriority, default: GoalPriority.MEDIUM })
  priority?: GoalPriority;

  @ManyToOne(() => User, (user) => user.goals, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToMany(() => Task, (task) => task.goal, { cascade: true, eager: true  })
  tasks: Task[];
}
