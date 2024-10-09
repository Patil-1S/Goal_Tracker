import { Test, TestingModule } from '@nestjs/testing';
import { BaseModelController } from './base-model.controller';
import { BaseModelService } from './base-model.service';

describe('BaseModelController', () => {
  let controller: BaseModelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaseModelController],
      providers: [BaseModelService],
    }).compile();

    controller = module.get<BaseModelController>(BaseModelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
