import { Test, TestingModule } from '@nestjs/testing'
import { TransactionsController } from './transactions.controller'
import { TransactionsService } from './transactions.service'
import { TransactionType, TransactionStatus } from '../../../generated/prisma/enums'

const mockTransactionsService = {
  create: jest.fn(),
}

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
  let controller: TransactionsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        { provide: TransactionsService, useValue: mockTransactionsService },
      ],
    }).compile()

    controller = module.get<TransactionsController>(TransactionsController)
    jest.clearAllMocks()
  })

  describe('create', () => {
    const dto = {
      accountId: 'acc-001',
      categoryId: 'cat-001',
      type: TransactionType.EXPENSE,
      amount: 5000,
      description: 'Almoço',
    }

    it('deve chamar o service e retornar a transação criada', async () => {
      mockTransactionsService.create.mockResolvedValue(mockTransaction)

      const result = await controller.create(dto)

      expect(result).toEqual(mockTransaction)
      expect(mockTransactionsService.create).toHaveBeenCalledWith(
        'user-teste-001',
        dto,
      )
    })

    it('deve passar o userId correto para o service', async () => {
      mockTransactionsService.create.mockResolvedValue(mockTransaction)

      await controller.create(dto)

      expect(mockTransactionsService.create).toHaveBeenCalledTimes(1)
    })
  })
})