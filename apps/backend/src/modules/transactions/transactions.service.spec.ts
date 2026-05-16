import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { PrismaService } from '@common/prisma/prisma.service'

describe('TransactionsService', () => {
  let service: TransactionsService;

  const prismaMock = {
    transaction: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  //Helper que monta o filtro base por userId no Prisma
  const baseWhere = (userId: string) => ({
    account: {
      is: {
        institution: {
          is: {
            userId,
          },
        },
      },
    },
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
  })

  it('deve exsitir o service', () => {
    expect(service).toBeDefined();
  });

  it('deve retornar uma lista de transações', async () => {
    prismaMock.transaction.findMany.mockResolvedValue([
      { id: '1' },
    ]);

    const result = await service.findAll({
      userId: 'user-1',
    });

    expect(result).toHaveLength(1)
  });

  it('deve buscar transações do usuário', async () => {
    prismaMock.transaction.findMany.mockResolvedValue([
      { id: '1' },
    ]);

    await service.findAll({
      userId: 'user-1'
    });

    expect(prismaMock.transaction.findMany).toHaveBeenCalledWith({
      where: {
        ...baseWhere('user-1'),
      }
    })
  });

  it('deve filtrar as transações por categoryId', async () => {
    prismaMock.transaction.findMany.mockResolvedValue([]);

    await service.findAll({
      userId: 'user-1',
      categoryId: 'cat-1',
    });

    expect(prismaMock.transaction.findMany).toHaveBeenCalledWith({
      where: {
        ...baseWhere('user-1'),
        categoryId: 'cat-1',
      },
    })

  });

  it('deve filtrar as transações por type', async () => {
    prismaMock.transaction.findMany.mockResolvedValue([]);

    await service.findAll({
      userId: 'user-1',
      type: 'INCOME',
    });

    expect(prismaMock.transaction.findMany).toHaveBeenCalledWith({
      where: {
        ...baseWhere('user-1'),
        type: 'INCOME',
      },
    })
  });

  it('deve filtrar as transações por categoryId e type', async () => {
    prismaMock.transaction.findMany.mockResolvedValue([]);

    await service.findAll({
      userId: 'user-1',
      categoryId: 'cat-1',
      type: 'INCOME',
    });

    expect(prismaMock.transaction.findMany).toHaveBeenCalledWith({
      where: {
        ...baseWhere('user-1'),
        categoryId: 'cat-1',
        type: 'INCOME',
      },
    })
  });

  it('deve retornar uma transação quando o usuário tiver acesso', async () => {
    prismaMock.transaction.findUnique.mockResolvedValue({
      id: '1',
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
    ).rejects.toThrow('Transação não encontrada');
  });

  it('deve lançar ForbiddenException quando o usuário não tiver acesso', async () => {
    prismaMock.transaction.findUnique.mockResolvedValue({
      id: '1',
      account: {
        institution: {
          userId: 'outro-user'
        },
      },
    });

    await expect(
      service.findOne({
        userId: 'user-1',
        id: '1',
      }),
    ).rejects.toThrow("Você não tem acesso a esta transação");
  });

  it('deve atualizar transação com sucesso', async () => {
    prismaMock.transaction.findUnique.mockResolvedValue({
      id: '1',
      account: {
        institution: {
          userId: 'user-1'
        },
      },
    });

    prismaMock.transaction.update.mockResolvedValue({
      id: '1',
      description: 'novo valor',
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
    });

    expect(result.description).toBe('novo valor');
  });

  it('deve deletar transação com sucesso', async () => {
    prismaMock.transaction.findUnique.mockResolvedValue({
      id: '1',
      account: {
        institution: {
          userId: 'user-1'
        },
      },
    });

    prismaMock.transaction.delete.mockResolvedValue({
      id: '1',
    });

    const result = await service.remove({
      userId: 'user-1',
      id: '1',
    });

    expect(prismaMock.transaction.delete).toHaveBeenCalledWith({
      where: { id: '1' },
    });

    expect(result).toEqual({ id: '1' });
  });
});