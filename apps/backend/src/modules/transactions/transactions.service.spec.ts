import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { PrismaService } from '@common/prisma/prisma.service'
import { BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common'
import { TransactionType, TransactionStatus } from '../../../generated/prisma/enums'

const prismaMock = {
  $transaction: jest.fn((calls) => Promise.all(calls)),
  category: { findUnique: jest.fn() },
  subCategory: { findUnique: jest.fn() },
  account: { findUnique: jest.fn() },
  transaction: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
};

const mockCategory = {
  id: 'cat-1',
  userId: 'user-1',
  name: 'Alimentação',
}

const mockAccount = {
  id: 'acc-1',
  name: 'Conta Corrente',
}

const mockTransaction = {
  id: 'tx-1',
  type: TransactionType.EXPENSE,
  amount: 5000,
  description: 'Almoço',
  date: new Date('2026-01-01T00:00:00.000Z'),
  status: TransactionStatus.COMPLETED,
  category: { id: 'cat-1', name: 'Alimentação' },
  subCategory: null,
  account: { id: 'acc-1', name: 'Conta Corrente' },
}

describe('TransactionsService', () => {
  let service: TransactionsService;

  //Helper que monta o filtro base por userId no Prisma
  const baseWhere = (userId: string) => ({
    account: {
      institution: {
        userId,
      },
    }
  });

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('deve existir o service', () => {
    expect(service).toBeDefined();
  });

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

      expect(result.id).toBe(mockTransaction.id);
      expect(result.type).toBe(mockTransaction.type);
      expect(result.amount).toBe(mockTransaction.amount);
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
      prismaMock.transaction.count.mockResolvedValue(1)
      prismaMock.transaction.findMany.mockResolvedValue([
        {
          id: '1',
          date: new Date('2026-01-01T00:00:00.000Z'),
          category: {
            id: 'cat-1',
            name: 'Alimentação',
          },
          subCategory: null,
          account: {
            institution: {
              userId: 'user-1',
            },
          },
        },
      ]);

      const result = await service.findAll('user-1', {});

      expect(result).toHaveProperty('data')
      expect(result.data).toHaveLength(1)
      expect(result.data[0].id).toBe('1')
    });

    it('deve buscar transações do usuário', async () => {
      prismaMock.transaction.count.mockResolvedValue(1)
      prismaMock.transaction.findMany.mockResolvedValue([
        {
          id: '1',
          date: new Date('2026-01-01T00:00:00.000Z'),
          category: {
            id: 'cat-1',
            name: 'Alimentação',
          },
          subCategory: null,
          account: {
            institution: {
              userId: 'user-1',
            },
          },
        },
      ]);

      await service.findAll('user-1', {});

      expect(prismaMock.transaction.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            ...baseWhere('user-1'),
          },
        })
      )
    });

    it('deve filtrar as transações por categoryId', async () => {
      prismaMock.transaction.count.mockResolvedValue(1)
      prismaMock.transaction.findMany.mockResolvedValue([]);

      await service.findAll('user-1', {
        categoryId: 'cat-1',
      });

      expect(prismaMock.transaction.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            ...baseWhere('user-1'),
            categoryId: 'cat-1',
          },
        })
      )
    });

    it('deve filtrar as transações por type', async () => {
      prismaMock.transaction.count.mockResolvedValue(1)
      prismaMock.transaction.findMany.mockResolvedValue([]);

      await service.findAll('user-1', {
        type: TransactionType.INCOME,
      });

      expect(prismaMock.transaction.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            ...baseWhere('user-1'),
            type: TransactionType.INCOME,
          },
        })
      )
    });

    it('deve filtrar as transações por categoryId e type', async () => {
      prismaMock.transaction.count.mockResolvedValue(1)
      prismaMock.transaction.findMany.mockResolvedValue([]);

      await service.findAll('user-1', {
        categoryId: 'cat-1',
        type: TransactionType.INCOME,
      });

      expect(prismaMock.transaction.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            ...baseWhere('user-1'),
            categoryId: 'cat-1',
            type: TransactionType.INCOME,
          },
        })
      )
    });
  });

  describe('findOne', () => {
    it('deve retornar uma transação quando o usuário tiver acesso', async () => {
      prismaMock.transaction.findUnique.mockResolvedValue({
        id: '1',
        date: new Date('2026-01-01T00:00:00.000Z'),
        category: {
          id: 'cat-1',
          name: 'Alimentação',
        },
        subCategory: null,
        account: {
          institution: {
            userId: 'user-1',
          },
        },
      });

      const result = await service.findOne({
        userId: 'user-1',
        id: '1',
      });

      expect(result).toHaveProperty('id', '1');
    });

    it('deve lançar NotFoundException quando não existir transação', async () => {
      prismaMock.transaction.findUnique.mockResolvedValue(null);

      await expect(
        service.findOne({
          userId: 'user-1',
          id: '1',
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('deve lançar ForbiddenException quando o usuário não tiver acesso', async () => {
      prismaMock.transaction.findUnique.mockResolvedValue({
        id: '1',
        date: new Date('2026-01-01T00:00:00.000Z'),
        category: {
          id: 'cat-1',
          name: 'Alimentação',
        },
        subCategory: null,
        account: {
          institution: {
            userId: 'outro-user',
          },
        },
      });

      await expect(
        service.findOne({
          userId: 'user-1',
          id: '1',
        }),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('update', () => {
    it('deve atualizar transação com sucesso', async () => {
      prismaMock.transaction.findUnique.mockResolvedValue({
        id: '1',
        date: new Date('2026-01-01T00:00:00.000Z'),
        category: {
          id: 'cat-1',
          name: 'Alimentação',
        },
        subCategory: null,
        account: {
          institution: {
            userId: 'user-1',
          },
        },
      });

      prismaMock.transaction.update.mockResolvedValue({
        id: '1',
        date: new Date('2026-01-01T00:00:00.000Z'),
        description: 'novo valor',
        category: {
          id: 'cat-1',
          name: 'Alimentação',
        },
        subCategory: null,
        account: {
          institution: {
            userId: 'user-1',
          },
        },
      });

      const result = await service.update({
        userId: 'user-1',
        id: '1',
        dto: {
          description: 'novo valor',
        },
      });

      expect(prismaMock.transaction.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { description: 'novo valor' },
        include: {
          account: true,
          category: true,
          subCategory: true,
        },
      })

      expect(result.description).toBe('novo valor');
    });
  });

  describe('remove', () => {
    it('deve remover transação com sucesso', async () => {
      prismaMock.transaction.findUnique.mockResolvedValue({
        id: '1',
        date: new Date('2026-01-01T00:00:00.000Z'),
        category: {
          id: 'cat-1',
          name: 'Alimentação',
        },
        subCategory: null,
        account: {
          institution: {
            userId: 'user-1',
          },
        },
      });

      prismaMock.transaction.delete.mockResolvedValue({
        id: '1',
        type: TransactionType.EXPENSE,
        amount: 5000,
        description: 'Almoço',
        date: new Date('2026-01-01T00:00:00.000Z'),
        status: TransactionStatus.COMPLETED,
        category: {
          id: 'cat-1',
          name: 'Alimentação',
        },
        subCategory: null,
        account: {
          id: 'acc-1',
          name: 'Conta Corrente',
          institution: {
            userId: 'user-1',
          },
        },
      })

      const result = await service.remove({
        userId: 'user-1',
        id: '1',
      });

      expect(prismaMock.transaction.delete).toHaveBeenCalledWith({
        where: { id: '1' },
        include: {
          account: true,
          category: true,
          subCategory: true,
        },
      })

      expect(result).toEqual(
        expect.objectContaining({
          id: '1',
          category: {
            id: 'cat-1',
            name: 'Alimentação',
          },
        }),
      )
    });
  });
});