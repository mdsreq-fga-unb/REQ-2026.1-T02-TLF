import { Test, TestingModule } from '@nestjs/testing'
import { TransactionsService } from './transactions.service'
import { PrismaService } from '@common/prisma/prisma.service'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { TransactionType, TransactionStatus } from '../../../generated/prisma/enums'

const mockPrisma = {
  category: {
    findUnique: jest.fn(),
  },
  subCategory: {
    findUnique: jest.fn(),
  },
  account: {
    findUnique: jest.fn(),
  },
  transaction: {
    create: jest.fn(),
  },
}

const mockCategory = {
  id: 'cat-001',
  userId: 'user-001',
  name: 'Alimentação',
}

const mockAccount = {
  id: 'acc-001',
  name: 'Conta Corrente',
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

describe('TransactionsService', () => {
  let service: TransactionsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile()

    service = module.get<TransactionsService>(TransactionsService)
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

    it('deve criar uma transação com sucesso', async () => {
      mockPrisma.category.findUnique.mockResolvedValue(mockCategory)
      mockPrisma.account.findUnique.mockResolvedValue(mockAccount)
      mockPrisma.transaction.create.mockResolvedValue(mockTransaction)

      const result = await service.create('user-001', dto)

      expect(result).toEqual(mockTransaction)
      expect(mockPrisma.transaction.create).toHaveBeenCalledTimes(1)
    })

    it('deve lançar NotFoundException se categoria não existir', async () => {
      mockPrisma.category.findUnique.mockResolvedValue(null)

      await expect(service.create('user-001', dto)).rejects.toThrow(NotFoundException)
    })

    it('deve lançar BadRequestException se categoria não pertencer ao usuário', async () => {
      mockPrisma.category.findUnique.mockResolvedValue({
        ...mockCategory,
        userId: 'outro-user',
      })

      await expect(service.create('user-001', dto)).rejects.toThrow(BadRequestException)
    })

    it('deve lançar NotFoundException se conta não existir', async () => {
      mockPrisma.category.findUnique.mockResolvedValue(mockCategory)
      mockPrisma.account.findUnique.mockResolvedValue(null)

      await expect(service.create('user-001', dto)).rejects.toThrow(NotFoundException)
    })

    it('deve lançar BadRequestException se subcategoria for inválida', async () => {
      mockPrisma.category.findUnique.mockResolvedValue(mockCategory)
      mockPrisma.subCategory.findUnique.mockResolvedValue(null)

      await expect(
        service.create('user-001', { ...dto, subCategoryId: 'sub-invalida' }),
      ).rejects.toThrow(BadRequestException)
    })
  })
})