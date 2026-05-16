import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

describe('TransactionsController', () => {
  let controller: TransactionsController;

  const serviceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        {
          provide: TransactionsService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('deve chamar findAll com userId e filtros', async () => {
    serviceMock.findAll.mockResolvedValue([{ id: '1' }]);

    const req = { user: { id: 'user-1' } } as any;

    const query = {
      categoryId: 'cat-1',
      type: 'INCOME',
    };

    await controller.findAll(req, query as any);

    expect(serviceMock.findAll).toHaveBeenCalledWith({
      userId: 'user-1',
      categoryId: 'cat-1',
      type: 'INCOME',
    });
  });

  it('deve chamar service.findOne corretamente', async () => {
    serviceMock.findOne.mockResolvedValue({ id: '1' });

    const req = { user: { id: 'user-1' } } as any;

    await controller.findOne(req, '1');

    expect(serviceMock.findOne).toHaveBeenCalledWith({
      userId: 'user-1',
      id: '1',
    });
  });

  it('deve chamar service.update com dados corretos', async () => {
    serviceMock.update.mockResolvedValue({ id: '1' });

    const req = { user: { id: 'user-1' } } as any;

    const dto = { description: 'novo valor' };

    await controller.update(req, '1', dto as any);

    expect(serviceMock.update).toHaveBeenCalledWith({
      userId: 'user-1',
      id: '1',
      dto,
    });
  });

  it('deve chamar service.remove com dados corretos', async () => {
    serviceMock.remove.mockResolvedValue({ id: '1' });

    const req = { user: { id: 'user-1' } } as any;

    await controller.remove(req, '1');

    expect(serviceMock.remove).toHaveBeenCalledWith({
      userId: 'user-1',
      id: '1',
    });
  });
});