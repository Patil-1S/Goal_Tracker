import { Injectable } from '@nestjs/common';
import { CreateBaseModelDto } from './dto/create-base-model.dto';
import { UpdateBaseModelDto } from './dto/update-base-model.dto';

@Injectable()
export class BaseModelService {
  create(createBaseModelDto: CreateBaseModelDto) {
    return 'This action adds a new baseModel';
  }

  findAll() {
    return `This action returns all baseModel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} baseModel`;
  }

  update(id: number, updateBaseModelDto: UpdateBaseModelDto) {
    return `This action updates a #${id} baseModel`;
  }

  remove(id: number) {
    return `This action removes a #${id} baseModel`;
  }
}
