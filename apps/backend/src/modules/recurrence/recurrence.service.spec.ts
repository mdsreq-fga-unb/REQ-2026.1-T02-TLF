import { Test, TestingModule } from '@nestjs/testing';
import { RecurrenceService } from './recurrence.service';
import { PrismaService } from '@common/prisma/prisma.service';
import { ForbiddenException, NotFoundException, BadRequestException } from '@nestjs/common';
import { RecurrenceDeleteScope } from './enums/recurrence-delete-scope.enum';
import { RecurrenceApplyScope } from './enums/recurrence-apply-scope.enum';

const prismaMock: Partial<Record<keyof PrismaService, any>> = {
  recurrence: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  transaction: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    createMany: jest.fn(),
    updateMany: jest.fn(),
    deleteMany: jest.fn(),
    count: jest.fn(),
  },
  account: {
    findUnique: jest.fn(),
  },
  category: {
    findUnique: jest.fn(),
  },
  subCategory: {
    findUnique: jest.fn(),
  },
  $transaction: jest.fn(async (cb: any) => cb(prismaMock)),
};

const mockRecurrence = {
  id: 'rec-1',
  description: 'Netflix',
  amount: 39.9,
  chargeDate: 10,
  startDate: new Date(),
  endDate: null,
  isActive: true,
  category: { id: 'cat-1', name: 'Assinaturas' },
  subCategory: null,
  account: {
    id: 'acc-1',
    name: 'Conta',
    institution: { userId: 'user-1' },
  },
};

describe('RecurrenceService', () => {
  let service: RecurrenceService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecurrenceService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get(RecurrenceService);
  });

  it('deve existir o service', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const dto = {
      accountId: 'acc-1',
      categoryId: 'cat-1',
      description: 'Netflix',
      amount: 39.9,
      chargeDate: 10,
      startDate: new Date().toISOString(),
      isActive: true,
    };

    it('deve criar recorrência com sucesso', async () => {
      prismaMock.account!.findUnique.mockResolvedValue({
        id: 'acc-1',
        institution: { userId: 'user-1' },
      });

      prismaMock.category!.findUnique.mockResolvedValue({
        id: 'cat-1',
        userId: 'user-1',
      });

      prismaMock.subCategory!.findUnique.mockResolvedValue(null);

      prismaMock.recurrence!.create.mockResolvedValue(mockRecurrence);

      const result = await service.create('user-1', dto as any);

      expect(result).toHaveProperty('id');
      expect(prismaMock.recurrence!.create).toHaveBeenCalled();
    });

    it('deve lançar NotFoundException se conta não existir', async () => {
      prismaMock.account!.findUnique.mockResolvedValue(null);

      await expect(service.create('user-1', dto as any)).rejects.toThrow(NotFoundException);
    });

    it('deve lançar ForbiddenException se categoria não for do usuário', async () => {
      prismaMock.account!.findUnique.mockResolvedValue({
        id: 'acc-1',
        institution: { userId: 'user-1' },
      });

      prismaMock.category!.findUnique.mockResolvedValue({
        id: 'cat-1',
        userId: 'other-user',
      });

      await expect(service.create('user-1', dto as any)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('findAll', () => {
    it('deve retornar lista de recorrências', async () => {
      prismaMock.recurrence.findMany.mockResolvedValue([mockRecurrence]);
      prismaMock.recurrence.count.mockResolvedValue(1);

      const result = await service.findAll('user-1', {});

      expect(result.data.length).toBe(1);
      expect(prismaMock.recurrence.findMany).toHaveBeenCalled();
    });

    it('deve filtrar por categoryId', async () => {
      prismaMock.recurrence.findMany.mockResolvedValue([]);
      prismaMock.recurrence.count.mockResolvedValue(0);

      await service.findAll('user-1', { categoryId: 'cat-1' });

      expect(prismaMock.recurrence.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            categoryId: 'cat-1',
          }),
        }),
      );
    });
  });

  describe('findOne', () => {
    it('deve retornar recorrência', async () => {
      prismaMock.recurrence.findUnique.mockResolvedValue(mockRecurrence);

      const result = await service.findOne('user-1', 'rec-1');

      expect(result).toHaveProperty('id', 'rec-1');
    });

    it('deve lançar NotFoundException', async () => {
      prismaMock.recurrence.findUnique.mockResolvedValue(null);

      await expect(service.findOne('user-1', 'rec-1')).rejects.toThrow(NotFoundException);
    });

    it('deve lançar ForbiddenException se não for dono', async () => {
      prismaMock.recurrence.findUnique.mockResolvedValue({
        ...mockRecurrence,
        account: {
          institution: { userId: 'other-user' },
        },
      });

      await expect(service.findOne('user-1', 'rec-1')).rejects.toThrow(ForbiddenException);
    });
  });

  describe('update', () => {
    it('deve atualizar recorrência', async () => {
      prismaMock.recurrence.findUnique.mockResolvedValue(mockRecurrence);

      prismaMock.recurrence.update.mockResolvedValue({
        ...mockRecurrence,
        description: 'Novo nome',
      });

      const result = await service.update('user-1', 'rec-1', {
        description: 'Novo nome',
      } as any);

      expect(result.description).toBe('Novo nome');
    });

    it('deve lançar ForbiddenException se não for dono', async () => {
      prismaMock.recurrence.findUnique.mockResolvedValue({
        ...mockRecurrence,
        account: {
          institution: { userId: 'outro-user' },
        },
      });

      await expect(
        service.update('user-1', 'rec-1', { description: 'x' } as any),
      ).rejects.toThrow(ForbiddenException);
    });

    it('deve lançar BadRequestException ao usar ALL com transações concluídas', async () => {
      prismaMock.recurrence.findUnique.mockResolvedValue(mockRecurrence);

      prismaMock.transaction.count.mockResolvedValue(1);
      prismaMock.transaction.findFirst.mockResolvedValue({ id: 't1' });

      await expect(
        service.update('user-1', 'rec-1', {
          applyScope: RecurrenceApplyScope.ALL,
        } as any),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('deve deletar recorrência THIS', async () => {
      prismaMock.recurrence.findUnique.mockResolvedValue(mockRecurrence);
      prismaMock.recurrence.delete.mockResolvedValue(mockRecurrence);

      const result = await service.remove('user-1', 'rec-1', {
        scope: RecurrenceDeleteScope.THIS,
      });

      expect(result).toHaveProperty('id');
    });

    it('deve deletar ALL recorrência', async () => {
      prismaMock.recurrence.findUnique.mockResolvedValue(mockRecurrence);
      prismaMock.recurrence.delete.mockResolvedValue(mockRecurrence);

      const result = await service.remove('user-1', 'rec-1', {
        scope: RecurrenceDeleteScope.ALL,
      });

      expect(result).toHaveProperty('id');
    });

    it('deve lançar BadRequestException para scope inválido', async () => {
      prismaMock.recurrence.findUnique.mockResolvedValue(mockRecurrence);

      await expect(
        service.remove('user-1', 'rec-1', { scope: 'INVALID' } as any),
      ).rejects.toThrow(BadRequestException);
    });
  });
});