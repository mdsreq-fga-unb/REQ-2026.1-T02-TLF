import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TransactionType, TransactionStatus } from '../../../generated/prisma/enums'

const transactionsServiceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

const mockTransaction = {
  id: 'tx-001',
  type: TransactionType.EXPENSE,
  amount: 5000,
  description: 'Almoço',
  date: new Date(),
  status: TransactionStatus.COMPLETED,
  category: { id: 'cat-001', name: 'Alimentação' },
  subCategory: null,
  account: { id: 'acc-001', name: 'Conta Corrente' },
}

describe('TransactionsController', () => {
  let controller: TransactionsController;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        {
          provide: TransactionsService,
          useValue: transactionsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  describe('create', () => {
    const dto = {
      accountId: 'acc-001',
      categoryId: 'cat-001',
      type: TransactionType.EXPENSE,
      amount: 5000,
      description: 'Almoço',
    }

    it('deve chamar o service e retornar a transação criada', async () => {
      transactionsServiceMock.create.mockResolvedValue(mockTransaction)

      const result = await controller.create(dto, 'user-teste-001')

      expect(result).toEqual(mockTransaction)
      expect(transactionsServiceMock.create).toHaveBeenCalledWith(
        'user-teste-001',
        dto,
      )
    })

    it('deve passar o userId correto para o service', async () => {
      transactionsServiceMock.create.mockResolvedValue(mockTransaction)

      await controller.create(dto, 'user-teste-001')

      expect(transactionsServiceMock.create).toHaveBeenCalledTimes(1)
    })
  });

  describe('findAll', () => {
    it('deve chamar findAll com userId e filtros', async () => {
      transactionsServiceMock.findAll.mockResolvedValue([{ id: '1' }]);

      const query = {
        categoryId: 'cat-1',
        type: 'INCOME',
      };

      await controller.findAll('user-1', query as any);

      expect(transactionsServiceMock.findAll).toHaveBeenCalledWith(
        'user-1',
        query,
      );
    });
  });

  describe('findOne', () => {
    it('deve chamar service.findOne corretamente', async () => {
      transactionsServiceMock.findOne.mockResolvedValue({ id: '1' });

      await controller.findOne('user-1', '1');

      expect(transactionsServiceMock.findOne).toHaveBeenCalledWith({
        userId: 'user-1',
        id: '1',
      });
    });
  });

  describe('update', () => {
    it('deve chamar service.update com dados corretos', async () => {
      transactionsServiceMock.update.mockResolvedValue({ id: '1' });

      const dto = { description: 'novo valor' };

      await controller.update('user-1', '1', dto as any);

      expect(transactionsServiceMock.update).toHaveBeenCalledWith({
        userId: 'user-1',
        id: '1',
        dto,
      });
    });
  });

  describe('remove', () => {
    it('deve chamar service.remove com dados corretos', async () => {
      transactionsServiceMock.remove.mockResolvedValue({ id: '1' });

      await controller.remove('user-1', '1');

      expect(transactionsServiceMock.remove).toHaveBeenCalledWith({
        userId: 'user-1',
        id: '1',
      });
    });
  });
});