import { Test, TestingModule } from '@nestjs/testing'
import { TransactionsController } from './transactions.controller'
import { TransactionsService } from './transactions.service'
import { AuthGuard } from '../auth/context/auth.guard'
import { TransactionType, TransactionStatus } from '../../../generated/prisma/enums'
import { FilterTransactionsDto } from './dto/filter-transactions.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'

const transactionsServiceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
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
  institution: { id: 'inst-001', name: 'Nubank' },
}

describe('TransactionsController', () => {
  let controller: TransactionsController

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        {
          provide: TransactionsService,
          useValue: transactionsServiceMock,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile()

    controller = module.get<TransactionsController>(TransactionsController)
  })

  describe('create', () => {
    const dto = {
      institutionId: 'inst-001',
      categoryId: 'cat-001',
      type: TransactionType.EXPENSE,
      amount: 5000,
      description: 'Almoço',
    }

    it('deve chamar o service e retornar a transação criada', async () => {
      transactionsServiceMock.create.mockResolvedValue(mockTransaction)

      const result = await controller.create(dto as never, 'user-teste-001')

      expect(result).toEqual(mockTransaction)
      expect(transactionsServiceMock.create).toHaveBeenCalledWith('user-teste-001', dto)
    })
  })

  describe('findAll', () => {
    it('deve chamar findAll com userId e filtros', async () => {
      transactionsServiceMock.findAll.mockResolvedValue({ data: [{ id: '1' }], meta: {} })

      const query: FilterTransactionsDto = {
        institutionId: 'inst-1',
        categoryId: 'cat-1',
        type: TransactionType.INCOME,
      }

      await controller.findAll('user-1', query)

      expect(transactionsServiceMock.findAll).toHaveBeenCalledWith('user-1', query)
    })
  })

  describe('findOne', () => {
    it('deve chamar service.findOne corretamente', async () => {
      transactionsServiceMock.findOne.mockResolvedValue({ id: '1' })

      await controller.findOne('user-1', '1')

      expect(transactionsServiceMock.findOne).toHaveBeenCalledWith({
        userId: 'user-1',
        id: '1',
      })
    })
  })

  describe('update', () => {
    it('deve chamar service.update com dados corretos', async () => {
      transactionsServiceMock.update.mockResolvedValue({ id: '1' })

      const dto: UpdateTransactionDto = { description: 'novo valor' }

      await controller.update('user-1', '1', dto)

      expect(transactionsServiceMock.update).toHaveBeenCalledWith({
        userId: 'user-1',
        id: '1',
        dto,
      })
    })
  })

  describe('remove', () => {
    it('deve chamar service.remove com dados corretos', async () => {
      transactionsServiceMock.remove.mockResolvedValue({ id: '1' })

      await controller.remove('user-1', '1')

      expect(transactionsServiceMock.remove).toHaveBeenCalledWith({
        userId: 'user-1',
        id: '1',
      })
    })
  })
})
