import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BaseModelService } from './base-model.service';
import { CreateBaseModelDto } from './dto/create-base-model.dto';
import { UpdateBaseModelDto } from './dto/update-base-model.dto';

@Controller('base-model')
export class BaseModelController {
  constructor(private readonly baseModelService: BaseModelService) {}

  @Post()
  create(@Body() createBaseModelDto: CreateBaseModelDto) {
    return this.baseModelService.create(createBaseModelDto);
  }

  @Get()
  findAll() {
    return this.baseModelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.baseModelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBaseModelDto: UpdateBaseModelDto) {
    return this.baseModelService.update(+id, updateBaseModelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.baseModelService.remove(+id);
  }
}
