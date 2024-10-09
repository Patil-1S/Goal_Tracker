import { Module } from '@nestjs/common';
import { BaseModelService } from './base-model.service';
import { BaseModelController } from './base-model.controller';

@Module({
  controllers: [BaseModelController],
  providers: [BaseModelService],
})
export class BaseModelModule {}
