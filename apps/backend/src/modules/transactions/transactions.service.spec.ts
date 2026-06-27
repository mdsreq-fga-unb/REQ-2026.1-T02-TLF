import { Test, TestingModule } from '@nestjs/testing'
import { TransactionsService } from './transactions.service'
import { PrismaService } from '@common/prisma/prisma.service'
import { NotFoundException, ForbiddenException } from '@nestjs/common'
import { TransactionType, TransactionStatus } from '../../../generated/prisma/enums'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'

const prismaMock = {
  category: { findUnique: jest.fn() },
  subCategory: { findUnique: jest.fn() },
  institution: { findUnique: jest.fn() },
  recurrence: { findUnique: jest.fn() },
  invoice: { findUnique: jest.fn() },
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

const mockInstitution = {
  id: 'inst-1',
  userId: 'user-1',
  name: 'Nubank',
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
  institution: { id: 'inst-1', name: 'Nubank' },
  institutionId: 'inst-1',
  categoryId: 'cat-1',
  subCategoryId: null,
  invoiceId: null,
  recurrenceId: null,
  destinationInstitutionId: null,
}

const mockTransactionWithAccess = {
  ...mockTransaction,
  institution: mockInstitution,
}

const formattedTransaction = {
  id: mockTransaction.id,
  type: mockTransaction.type,
  amount: mockTransaction.amount,
  description: mockTransaction.description,
  date: mockTransaction.date.toISOString(),
  status: mockTransaction.status,
  destinationInstitutionId: undefined,
  category: mockTransaction.category,
  subCategory: undefined,
  institution: mockTransaction.institution,
}

describe('TransactionsService', () => {
  let service: TransactionsService

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
      institutionId: 'inst-1',
      categoryId: 'cat-1',
      type: TransactionType.EXPENSE,
      amount: 5000,
      description: 'Almoço',
    }

    it('deve criar uma transação com sucesso', async () => {
      prismaMock.category.findUnique.mockResolvedValue(mockCategory)
      prismaMock.institution.findUnique.mockResolvedValue(mockInstitution)
      prismaMock.transaction.create.mockResolvedValue(mockTransaction)

      const result = await service.create('user-1', dto as CreateTransactionDto)

      expect(result).toEqual(formattedTransaction)
      expect(prismaMock.transaction.create).toHaveBeenCalledTimes(1)
    })

    it('deve lançar NotFoundException se instituição não existir', async () => {
      prismaMock.category.findUnique.mockResolvedValue(mockCategory)
      prismaMock.institution.findUnique.mockResolvedValue(null)

      await expect(service.create('user-1', dto as CreateTransactionDto)).rejects.toThrow(
        NotFoundException,
      )
    })

    it('deve lançar BadRequestException se instituição não pertencer ao usuário', async () => {
      prismaMock.category.findUnique.mockResolvedValue(mockCategory)
      prismaMock.institution.findUnique.mockResolvedValue({
        ...mockInstitution,
        userId: 'outro-user',
      })

      await expect(service.create('user-1', dto as CreateTransactionDto)).rejects.toThrow(
        ForbiddenException,
      )
    })
  })

  describe('findAll', () => {
    it('deve retornar uma lista de transações', async () => {
      prismaMock.transaction.findMany.mockResolvedValue([mockTransaction])
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
      prismaMock.transaction.findMany.mockResolvedValue([mockTransaction])
      prismaMock.transaction.count.mockResolvedValue(1)

      await service.findAll('user-1', {})

      expect(prismaMock.transaction.findMany).toHaveBeenCalledWith({
        where: { institution: { userId: 'user-1' } },
        skip: 0,
        take: 20,
        orderBy: { date: 'desc' },
        include: {
          category: { select: { id: true, name: true } },
          subCategory: { select: { id: true, name: true } },
          institution: { select: { id: true, name: true } },
        },
      })
    })
  })

  describe('findOne', () => {
    it('deve retornar uma transação quando o usuário tiver acesso', async () => {
      prismaMock.transaction.findUnique.mockResolvedValue(mockTransactionWithAccess)

      const result = await service.findOne({
        userId: 'user-1',
        id: '1',
      })

      expect(result).toEqual(formattedTransaction)
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
      prismaMock.transaction.findUnique.mockResolvedValue({
        ...mockTransaction,
        institution: { ...mockInstitution, userId: 'outro-user' },
      })

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
      prismaMock.transaction.findUnique.mockResolvedValue(mockTransactionWithAccess)
      prismaMock.institution.findUnique.mockResolvedValue(mockInstitution)

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
        } as UpdateTransactionDto,
      })

      expect(prismaMock.transaction.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { description: 'novo valor' },
        include: {
          category: true,
          subCategory: true,
          institution: true,
        },
      })

      expect(result.description).toBe('novo valor')
    })
  })

  describe('remove', () => {
    it('deve remover transação com sucesso', async () => {
      prismaMock.transaction.findUnique.mockResolvedValue(mockTransactionWithAccess)
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
        where: { id: 'tx-1' },
      })
    })
  })
})
