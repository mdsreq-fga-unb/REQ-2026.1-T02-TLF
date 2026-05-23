import { Test, TestingModule } from '@nestjs/testing';
import { RecurrenceService } from './recurrence.service';

describe('RecurrenceService', () => {
  let service: RecurrenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecurrenceService],
    }).compile();

    service = module.get<RecurrenceService>(RecurrenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
