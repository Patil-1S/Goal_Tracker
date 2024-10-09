import { PartialType } from '@nestjs/mapped-types';
import { CreateBaseModelDto } from './create-base-model.dto';

export class UpdateBaseModelDto extends PartialType(CreateBaseModelDto) {}
