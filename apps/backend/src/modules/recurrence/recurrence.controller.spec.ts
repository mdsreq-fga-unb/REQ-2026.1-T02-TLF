import { Test, TestingModule } from '@nestjs/testing';
import { RecurrenceController } from './recurrence.controller';
import { RecurrenceService } from './recurrence.service';

describe('RecurrenceController', () => {
  let controller: RecurrenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecurrenceController],
      providers: [RecurrenceService],
    }).compile();

    controller = module.get<RecurrenceController>(RecurrenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
