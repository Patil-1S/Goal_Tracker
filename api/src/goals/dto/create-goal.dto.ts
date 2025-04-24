import {
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  IsDateString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import {
  GoalCategory,
  GoalPriority,
  GoalStatus,
} from '../entities/goals.entity';
import { Type } from 'class-transformer';

class CreateTaskDto {
  @IsString()
  task_title: string;

  @IsOptional()
  completed?: boolean;
}

export class CreateGoalDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(GoalStatus)
  status?: GoalStatus;

  @IsOptional()
  @IsInt()
  progress?: number;

  @IsOptional()
  @IsDateString()
  deadline?: Date;

  @IsOptional()
  @IsEnum(GoalCategory)
  category?: GoalCategory;

  @IsOptional()
  @IsEnum(GoalPriority)
  priority?: GoalPriority;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateTaskDto)
  tasks?: CreateTaskDto[];
}
