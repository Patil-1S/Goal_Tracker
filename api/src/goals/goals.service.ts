import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { Goal } from './entities/goals.entity';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { User } from '../user/entities/user.entity';
import { Task } from './entities/task.entity';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(Goal)
    private goalsRepository: Repository<Goal>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createGoalDto: CreateGoalDto, userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) throw new NotFoundException('User not found');

    const goal = this.goalsRepository.create({
      ...createGoalDto,
      user,
    });

    return await this.goalsRepository.save(goal);
  }

  async findAll(
    userId: string,
    search?: {
      title: string;
      status: string;
      dueStart: string;
      dueEnd: string;
    },
  ): Promise<Goal[]> {
    // return await this.goalsRepository.find({
    //   where: { user: { id: userId }, deletedAt: null },
    //   relations: ['user'],
    //   order: { createdAt: 'DESC' },
    // });

    const query = this.goalsRepository
      .createQueryBuilder('goal')
      .leftJoinAndSelect('goal.user', 'user')
      .leftJoinAndSelect('goal.tasks', 'task')
      .where('goal.userId = :userId', { userId })
      .andWhere('goal.deletedAt IS NULL');

    if (search.title) {
      query.andWhere('LOWER(goal.title) LIKE :title', {
        title: `%${search.title.toLowerCase()}%`,
      });
    }

    if (search.status) {
      query.andWhere('goal.status = :status', { status: search.status });
    }

    if (search.dueStart && search.dueEnd) {
      query.andWhere('goal.deadline BETWEEN :dueStart AND :dueEnd', {
        dueStart: search.dueStart,
        dueEnd: search.dueEnd,
      });
    } else if (search.dueStart) {
      query.andWhere('goal.deadline >= :dueStart', {
        dueStart: search.dueStart,
      });
    } else if (search.dueEnd) {
      query.andWhere('goal.deadline <= :dueEnd', { dueEnd: search.dueEnd });
    }

    return query.orderBy('goal.createdAt', 'DESC').getMany();
  }

  async findOne(id: string, userId: string): Promise<Goal> {
    const goal = await this.goalsRepository.findOne({
      where: { id, user: { id: userId }, deletedAt: null },
      relations: ['user'],
    });
    if (!goal) {
      throw new NotFoundException(`Goal with ID ${id} not found`);
    }
    return goal;
  }

  async update(goalId: string, updateGoalDto: UpdateGoalDto, userId: string) {
    const goal = await this.goalsRepository.findOne({
      where: { id: goalId, user: { id: userId }, deletedAt: null },
      relations: ['user'],
    });

    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    if (goal.user.id !== userId) {
      throw new ForbiddenException('You do not have access to this goal');
    }

    Object.assign(goal, updateGoalDto);
    return this.goalsRepository.save(goal);
  }

  async remove(id: string, userId: string): Promise<void> {
    const result = await this.goalsRepository.update(
      { id, user: { id: userId } },
      { deletedAt: new Date() },
    );

    if (result.affected === 0) {
      throw new NotFoundException(
        `Goal with ID ${id} not found or doesn't belong to user`,
      );
    }
  }

  async updateTaskStatus(
    taskId: string,
    completed: boolean,
    userId: string,
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['goal'],
    });

    if (!task) throw new NotFoundException('Task not found');

    task.completed = completed;
    const updatedTask = await this.taskRepository.save(task);

    await this.calculateGoalProgress(task.goal.id, userId);

    return updatedTask;
  }

  async calculateGoalProgress(goalId: string, userId: string) {
    const goal = await this.goalsRepository.findOne({
      where: { id: goalId, user: { id: userId } },
      relations: ['tasks', 'user'],
    });

    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    const totalTasks = goal.tasks.length;
    const completedTasks = goal.tasks.filter((task) => task.completed).length;

    const progress =
      totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    goal.progress = progress;
    return this.goalsRepository.save(goal);
  }
}
