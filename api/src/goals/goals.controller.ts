import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('goals')
@UseGuards(JwtAuthGuard)
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  @Post()
  create(@Body() createGoalDto: CreateGoalDto, @Request() req) {
    const userId = req.user?.userId;
    return this.goalsService.create(createGoalDto, userId);
  }

  @Get()
  findAll(
    @Request() req: any,
    @Query('title') title?: string,
    @Query('status') status?: string,
    @Query('dueStart') dueStart?: string,
    @Query('dueEnd') dueEnd?: string,
  ) {
    return this.goalsService.findAll(req.user.userId, {
      title,
      status,
      dueStart,
      dueEnd,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.goalsService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGoalDto: UpdateGoalDto,
    @Request() req,
  ) {
    return this.goalsService.update(id, updateGoalDto, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.goalsService.remove(id, req.user.userId);
  }

  @Patch('tasks/:id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('completed') completed: boolean,
    @Request() req,
  ) {
    return this.goalsService.updateTaskStatus(id, completed, req.user.userId);
  }
}
