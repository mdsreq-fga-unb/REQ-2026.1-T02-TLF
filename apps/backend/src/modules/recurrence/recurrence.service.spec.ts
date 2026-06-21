import { Test, TestingModule } from '@nestjs/testing'
import { RecurrenceService } from './recurrence.service'
import { PrismaService } from '@common/prisma/prisma.service'
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common'
import { RecurrenceApplyScope } from './enums/recurrence-apply-scope.enum'
import { RecurrenceDeleteScope } from './enums/recurrence-delete-scope.enum'
import { CreateRecurrenceDto } from './dto/create-recurrence.dto'
import { UpdateRecurrenceDto } from './dto/update-recurrence.dto'

const prismaMock = {
  $transaction: jest.fn(),

  account: {
    findUnique: jest.fn(),
  },

  category: {
    findUnique: jest.fn(),
  },

  subCategory: {
    findUnique: jest.fn(),
  },

  transaction: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
    findFirst: jest.fn(),
    createMany: jest.fn(),
  },

  recurrence: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
}

prismaMock.$transaction.mockImplementation((arg: unknown) => {
  if (Array.isArray(arg)) {
    return Promise.all(arg)
  }

  if (typeof arg === 'function') {
    return arg({
      ...prismaMock,
      transaction: {
        ...prismaMock.transaction,
        deleteMany: jest.fn(),
      },
    })
  }

  return arg
})

const mockRecurrence = {
  id: 'rec-1',
  description: 'Netflix',
  amount: 2990,
  chargeDate: 10,
  startDate: new Date('2026-01-01T00:00:00.000Z'),
  endDate: null,
  isActive: true,
  category: { id: 'cat-1', name: 'Assinaturas' },
  subCategory: null,
  account: {
    id: 'acc-1',
    name: 'Conta',
    institution: { userId: 'user-1' },
  },
}

describe('RecurrenceService', () => {
  let service: RecurrenceService

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecurrenceService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile()

    service = module.get<RecurrenceService>(RecurrenceService)
  })

  it('deve existir o service', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    const dto: CreateRecurrenceDto = {
      accountId: 'acc-1',
      categoryId: 'cat-1',
      description: 'Netflix',
      amount: 2990,
      chargeDate: 10,
      startDate: new Date().toISOString(),
      isActive: true,
    }

    it('deve criar recorrência com sucesso', async () => {
      prismaMock.account.findUnique.mockResolvedValue({
        id: 'acc-1',
        institution: { userId: 'user-1' },
      })

      prismaMock.category.findUnique.mockResolvedValue({
        id: 'cat-1',
        userId: 'user-1',
      })

      prismaMock.subCategory.findUnique.mockResolvedValue(null)

      prismaMock.recurrence.create.mockResolvedValue(mockRecurrence)

      const result = await service.create('user-1', dto)

      expect(result.id).toBe('rec-1')
      expect(prismaMock.recurrence.create).toHaveBeenCalledTimes(1)
    })

    it('deve lançar NotFoundException se conta não existir', async () => {
      prismaMock.account.findUnique.mockResolvedValue(null)

      await expect(service.create('user-1', dto)).rejects.toThrow(NotFoundException)
    })

    it('deve lançar ForbiddenException se categoria não pertencer ao usuário', async () => {
      prismaMock.account.findUnique.mockResolvedValue({
        id: 'acc-1',
        institution: { userId: 'user-1' },
      })

      prismaMock.category.findUnique.mockResolvedValue({
        id: 'cat-1',
        userId: 'other-user',
      })

      await expect(service.create('user-1', dto)).rejects.toThrow(ForbiddenException)
    })
  })

  describe('findAll', () => {
    it('deve retornar lista de recorrências', async () => {
      prismaMock.recurrence.findMany.mockResolvedValue([mockRecurrence])
      prismaMock.recurrence.count.mockResolvedValue(1)

      const result = await service.findAll('user-1', {})

      expect(result.data.length).toBe(1)
      expect(prismaMock.recurrence.findMany).toHaveBeenCalledTimes(1)
    })

    it('deve filtrar por categoryId', async () => {
      prismaMock.recurrence.findMany.mockResolvedValue([])
      prismaMock.recurrence.count.mockResolvedValue(0)

      await service.findAll('user-1', { categoryId: 'cat-1' })

      expect(prismaMock.recurrence.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            categoryId: 'cat-1',
          }),
        }),
      )
    })
  })

  describe('findOne', () => {
    it('deve retornar recorrência', async () => {
      prismaMock.recurrence.findUnique.mockResolvedValue(mockRecurrence)

      const result = await service.findOne('user-1', 'rec-1')

      expect(result.id).toBe('rec-1')
    })

    it('deve lançar NotFoundException', async () => {
      prismaMock.recurrence.findUnique.mockResolvedValue(null)

      await expect(service.findOne('user-1', 'rec-1')).rejects.toThrow(NotFoundException)
    })

    it('deve lançar ForbiddenException se não for dono', async () => {
      prismaMock.recurrence.findUnique.mockResolvedValue({
        ...mockRecurrence,
        account: {
          institution: { userId: 'other-user' },
        },
      })

      await expect(service.findOne('user-1', 'rec-1')).rejects.toThrow(ForbiddenException)
    })
  })

  describe('update', () => {
    it('deve atualizar recorrência com sucesso', async () => {
      prismaMock.recurrence.findUnique.mockResolvedValue(mockRecurrence)

      prismaMock.recurrence.update.mockResolvedValue({
        ...mockRecurrence,
        description: 'Netflix Premium',
      })

      const result = await service.update('user-1', 'rec-1', {
        description: 'Netflix Premium',
      } satisfies UpdateRecurrenceDto)

      expect(result.description).toBe('Netflix Premium')
      expect(prismaMock.recurrence.update).toHaveBeenCalledTimes(1)
    })

    it('deve lançar ForbiddenException se não for dono', async () => {
      prismaMock.recurrence.findUnique.mockResolvedValue({
        ...mockRecurrence,
        account: {
          institution: { userId: 'other-user' },
        },
      })

      await expect(
        service.update('user-1', 'rec-1', { description: 'x' } satisfies UpdateRecurrenceDto),
      ).rejects.toThrow(ForbiddenException)
    })

    it('deve lançar BadRequestException ao usar ALL com transações concluídas', async () => {
      prismaMock.recurrence.findUnique.mockResolvedValue(mockRecurrence)

      prismaMock.transaction.count.mockResolvedValue(1)
      prismaMock.transaction.findFirst.mockResolvedValue({ id: 't-1' })

      await expect(
        service.update('user-1', 'rec-1', {
          applyScope: RecurrenceApplyScope.ALL,
        } satisfies UpdateRecurrenceDto),
      ).rejects.toThrow(BadRequestException)
    })
  })

  describe('remove', () => {
    it('deve remover THIS', async () => {
      prismaMock.recurrence.findUnique.mockResolvedValue(mockRecurrence)
      prismaMock.recurrence.delete.mockResolvedValue(mockRecurrence)

      const result = await service.remove('user-1', 'rec-1', {
        scope: RecurrenceDeleteScope.THIS,
      })

      expect(result.id).toBe('rec-1')
    })

    it('deve remover ALL', async () => {
      prismaMock.recurrence.findUnique.mockResolvedValue(mockRecurrence)
      prismaMock.recurrence.delete.mockResolvedValue(mockRecurrence)

      const result = await service.remove('user-1', 'rec-1', {
        scope: RecurrenceDeleteScope.ALL,
      })

      expect(result.id).toBe('rec-1')
    })

    it('deve lançar BadRequestException para scope inválido', async () => {
      prismaMock.recurrence.findUnique.mockResolvedValue(mockRecurrence)

      await expect(
        service.remove('user-1', 'rec-1', {
          scope: 'INVALID' as unknown as RecurrenceDeleteScope,
        }),
      ).rejects.toThrow(BadRequestException)
    })
  })

  describe('generateTransactionsFromRecurrences', () => {
    it('deve criar transações para recorrências ativas do mês', async () => {
      prismaMock.recurrence.findMany.mockResolvedValue([mockRecurrence])

      prismaMock.transaction.findMany.mockResolvedValue([])

      prismaMock.transaction.createMany.mockResolvedValue({ count: 1 })

      await service.generateTransactionsFromRecurrences()

      expect(prismaMock.transaction.createMany).toHaveBeenCalledTimes(1)
    })

    it('não deve criar transações duplicadas no mesmo mês', async () => {
      prismaMock.recurrence.findMany.mockResolvedValue([mockRecurrence])

      prismaMock.transaction.findMany.mockResolvedValue([{ recurrenceId: 'rec-1' }])

      await service.generateTransactionsFromRecurrences()

      const call = prismaMock.transaction.createMany.mock.calls[0]?.[0]

      expect(call.data.length).toBe(0)
    })

    it('deve ajustar chargeDate para o último dia do mês', async () => {
      prismaMock.recurrence.findMany.mockResolvedValue([
        {
          ...mockRecurrence,
          chargeDate: 31,
        },
      ])

      prismaMock.transaction.findMany.mockResolvedValue([])

      prismaMock.transaction.createMany.mockResolvedValue({ count: 1 })

      await service.generateTransactionsFromRecurrences()

      const call = prismaMock.transaction.createMany.mock.calls[0][0]

      const createdDate = call.data[0].date

      const lastDayOfMonth = new Date(
        createdDate.getFullYear(),
        createdDate.getMonth() + 1,
        0,
      ).getDate()

      expect(createdDate.getDate()).toBeLessThanOrEqual(lastDayOfMonth)
    })

    it('não deve criar transações para recorrências inativas', async () => {
      prismaMock.recurrence.findMany.mockResolvedValue([])

      prismaMock.transaction.findMany.mockResolvedValue([])

      await service.generateTransactionsFromRecurrences()

      const call = prismaMock.transaction.createMany.mock.calls[0]?.[0]

      expect(call?.data?.length ?? 0).toBe(0)
    })
  })
})
