import { Test, TestingModule } from '@nestjs/testing';
import { BaseModelService } from './base-model.service';

describe('BaseModelService', () => {
  let service: BaseModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseModelService],
    }).compile();

    service = module.get<BaseModelService>(BaseModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
