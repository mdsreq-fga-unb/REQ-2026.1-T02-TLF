import { Test, TestingModule } from '@nestjs/testing'
import { TransactionsService } from './transactions.service'
import { PrismaService } from '@common/prisma/prisma.service'
import { BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common'
import { TransactionType, TransactionStatus } from '../../../generated/prisma/enums'

const prismaMock = {
  category: { findUnique: jest.fn() },
  subCategory: { findUnique: jest.fn() },
  account: { findUnique: jest.fn() },
  transaction: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  deletedRecord: {
    createMany: jest.fn(),
  },
  $transaction: jest.fn(),
}

prismaMock.$transaction.mockImplementation((arg: unknown) => {
  if (typeof arg === 'function') {
    return arg(prismaMock)
  }
  return Promise.all(arg as Promise<unknown>[])
})

const mockCategory = {
  id: 'cat-1',
  userId: 'user-1',
  name: 'Alimentação',
}

const mockAccount = {
  id: 'acc-1',
  name: 'Conta Corrente',
  institution: {
    userId: 'user-1',
  },
}

const mockTransaction = {
  id: 'tx-1',
  type: TransactionType.EXPENSE,
  amount: 5000,
  description: 'Almoço',
  date: new Date('2026-05-02T00:00:00.000Z'),
  status: TransactionStatus.COMPLETED,
  category: { id: 'cat-1', name: 'Alimentação' },
  subCategory: null,
  account: { id: 'acc-1', name: 'Conta Corrente' },
}

const formattedTransaction = {
  id: mockTransaction.id,
  type: mockTransaction.type,
  amount: mockTransaction.amount,
  description: mockTransaction.description,
  date: mockTransaction.date.toISOString(),
  status: mockTransaction.status,
  category: mockTransaction.category,
  subCategory: undefined,
  account: mockTransaction.account,
}

const transactionWithAccess = (userId: string) => ({
  ...mockTransaction,
  id: '1',
  account: {
    ...mockTransaction.account,
    institution: { userId },
  },
})

describe('TransactionsService', () => {
  let service: TransactionsService

  // Helper que monta o filtro base por userId no Prisma
  const baseWhere = (userId: string) => ({
    account: {
      institution: { userId },
    },
  })

  const listQueryOptions = {
    skip: 0,
    take: 20,
    orderBy: { date: 'desc' as const },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      subCategory: {
        select: {
          id: true,
          name: true,
        },
      },
      account: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  }

  const listRow = {
    id: '1',
    type: TransactionType.EXPENSE,
    amount: 5000,
    description: 'Almoço',
    date: new Date('2026-05-02T00:00:00.000Z'),
    status: TransactionStatus.COMPLETED,
    category: { id: 'cat-001', name: 'Alimentação' },
    subCategory: null,
    account: { id: 'acc-001', name: 'Conta Corrente' },
  }

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile()

    service = module.get<TransactionsService>(TransactionsService)
  })

  it('deve existir o service', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    const dto = {
      accountId: 'acc-1',
      categoryId: 'cat-1',
      type: TransactionType.EXPENSE,
      amount: 5000,
      description: 'Almoço',
    }

    it('deve criar uma transação com sucesso', async () => {
      prismaMock.category.findUnique.mockResolvedValue(mockCategory)
      prismaMock.account.findUnique.mockResolvedValue(mockAccount)
      prismaMock.transaction.create.mockResolvedValue(mockTransaction)

      const result = await service.create('user-1', dto)

      expect(result).toEqual(formattedTransaction)
      expect(prismaMock.transaction.create).toHaveBeenCalledTimes(1)
    })

    it('deve lançar NotFoundException se categoria não existir', async () => {
      prismaMock.category.findUnique.mockResolvedValue(null)

      await expect(service.create('user-1', dto)).rejects.toThrow(NotFoundException)
    })

    it('deve lançar BadRequestException se categoria não pertencer ao usuário', async () => {
      prismaMock.category.findUnique.mockResolvedValue({
        ...mockCategory,
        userId: 'outro-user',
      })

      await expect(service.create('user-1', dto)).rejects.toThrow(BadRequestException)
    })

    it('deve lançar NotFoundException se conta não existir', async () => {
      prismaMock.category.findUnique.mockResolvedValue(mockCategory)
      prismaMock.account.findUnique.mockResolvedValue(null)

      await expect(service.create('user-1', dto)).rejects.toThrow(NotFoundException)
    })

    it('deve lançar BadRequestException se conta não pertencer ao usuário', async () => {
      prismaMock.category.findUnique.mockResolvedValue(mockCategory)
      prismaMock.account.findUnique.mockResolvedValue({
        ...mockAccount,
        institution: { userId: 'outro-user' },
      })

      await expect(service.create('user-1', dto)).rejects.toThrow(BadRequestException)
    })

    it('deve lançar NotFoundException se conta de destino não existir', async () => {
      prismaMock.category.findUnique.mockResolvedValue(mockCategory)
      prismaMock.account.findUnique.mockResolvedValueOnce({
        ...mockAccount,
        institution: { userId: 'user-1' },
      })
      prismaMock.account.findUnique.mockResolvedValueOnce(null)

      await expect(
        service.create('user-1', { ...dto, type: TransactionType.TRANSFER, destinationAccountId: 'acc-outro' }),
      ).rejects.toThrow(NotFoundException)
    })

    it('deve lançar BadRequestException se conta de destino não pertencer ao usuário', async () => {
      prismaMock.category.findUnique.mockResolvedValue(mockCategory)
      prismaMock.account.findUnique.mockResolvedValueOnce({
        ...mockAccount,
        institution: { userId: 'user-1' },
      })
      prismaMock.account.findUnique.mockResolvedValueOnce({
        ...mockAccount,
        id: 'acc-2',
        institution: { userId: 'outro-user' },
      })

      await expect(
        service.create('user-1', { ...dto, type: TransactionType.TRANSFER, destinationAccountId: 'acc-2' }),
      ).rejects.toThrow(BadRequestException)
    })

    it('deve lançar BadRequestException se subcategoria for inválida', async () => {
      prismaMock.category.findUnique.mockResolvedValue(mockCategory)
      prismaMock.subCategory.findUnique.mockResolvedValue(null)

      await expect(
        service.create('user-1', { ...dto, subCategoryId: 'sub-invalida' }),
      ).rejects.toThrow(BadRequestException)
    })
  })

  describe('findAll', () => {
    it('deve retornar uma lista de transações', async () => {
      prismaMock.transaction.findMany.mockResolvedValue([listRow])
      prismaMock.transaction.count.mockResolvedValue(1)

      const result = await service.findAll('user-1', {})

      expect(result.data).toHaveLength(1)
      expect(result.meta).toEqual({
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      })
    })

    it('deve buscar transações do usuário', async () => {
      prismaMock.transaction.findMany.mockResolvedValue([listRow])
      prismaMock.transaction.count.mockResolvedValue(1)

      await service.findAll('user-1', {})

      expect(prismaMock.transaction.findMany).toHaveBeenCalledWith({
        where: baseWhere('user-1'),
        ...listQueryOptions,
      })
    })

    it('deve filtrar as transações por categoryId', async () => {
      prismaMock.transaction.findMany.mockResolvedValue([])
      prismaMock.transaction.count.mockResolvedValue(0)

      await service.findAll('user-1', { categoryId: 'cat-1' })

      expect(prismaMock.transaction.findMany).toHaveBeenCalledWith({
        where: {
          ...baseWhere('user-1'),
          categoryId: 'cat-1',
        },
        ...listQueryOptions,
      })
    })

    it('deve filtrar as transações por type', async () => {
      prismaMock.transaction.findMany.mockResolvedValue([])
      prismaMock.transaction.count.mockResolvedValue(0)

      await service.findAll('user-1', { type: TransactionType.INCOME })

      expect(prismaMock.transaction.findMany).toHaveBeenCalledWith({
        where: {
          ...baseWhere('user-1'),
          type: TransactionType.INCOME,
        },
        ...listQueryOptions,
      })
    })

    it('deve filtrar as transações por categoryId e type', async () => {
      prismaMock.transaction.findMany.mockResolvedValue([])
      prismaMock.transaction.count.mockResolvedValue(0)

      await service.findAll('user-1', {
        categoryId: 'cat-1',
        type: TransactionType.INCOME,
      })

      expect(prismaMock.transaction.findMany).toHaveBeenCalledWith({
        where: {
          ...baseWhere('user-1'),
          categoryId: 'cat-1',
          type: TransactionType.INCOME,
        },
        ...listQueryOptions,
      })
    })
  })

  describe('findOne', () => {
    it('deve retornar uma transação quando o usuário tiver acesso', async () => {
      prismaMock.transaction.findUnique.mockResolvedValue(transactionWithAccess('user-1'))

      const result = await service.findOne({
        userId: 'user-1',
        id: '1',
      })

      expect(result).toEqual({
        ...formattedTransaction,
        id: '1',
      })
    })

    it('deve lançar NotFoundException quando não existir transação', async () => {
      prismaMock.transaction.findUnique.mockResolvedValue(null)

      await expect(
        service.findOne({
          userId: 'user-1',
          id: '1',
        }),
      ).rejects.toThrow(NotFoundException)
    })

    it('deve lançar ForbiddenException quando o usuário não tiver acesso', async () => {
      prismaMock.transaction.findUnique.mockResolvedValue(transactionWithAccess('outro-user'))

      await expect(
        service.findOne({
          userId: 'user-1',
          id: '1',
        }),
      ).rejects.toThrow(ForbiddenException)
    })
  })

  describe('update', () => {
    it('deve atualizar transação com sucesso', async () => {
      prismaMock.transaction.findUnique.mockResolvedValue(transactionWithAccess('user-1'))

      prismaMock.transaction.update.mockResolvedValue({
        ...mockTransaction,
        id: '1',
        date: new Date('2026-01-01T00:00:00.000Z'),
        description: 'novo valor',
      })

      const result = await service.update({
        userId: 'user-1',
        id: '1',
        dto: {
          description: 'novo valor',
        },
      })

      expect(prismaMock.transaction.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { description: 'novo valor' },
        include: {
          category: true,
          subCategory: true,
          account: true,
        },
      })

      expect(result.description).toBe('novo valor')
    })
  })

  describe('remove', () => {
    it('deve remover transação com sucesso', async () => {
      prismaMock.transaction.findUnique.mockResolvedValue(transactionWithAccess('user-1'))
      prismaMock.transaction.delete.mockResolvedValue({
        ...mockTransaction,
        id: '1',
      })
      prismaMock.deletedRecord.createMany.mockResolvedValue({ count: 1 })

      await service.remove({
        userId: 'user-1',
        id: '1',
      })

      expect(prismaMock.transaction.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      })
    })
  })
})
