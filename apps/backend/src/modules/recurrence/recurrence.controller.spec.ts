import { Test, TestingModule } from '@nestjs/testing';
import { RecurrenceController } from './recurrence.controller';
import { RecurrenceService } from './recurrence.service';
import { RecurrenceApplyScope } from './enums/recurrence-apply-scope.enum';
import { RecurrenceDeleteScope } from './enums/recurrence-delete-scope.enum';

const serviceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('RecurrenceController', () => {
  let controller: RecurrenceController;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecurrenceController],
      providers: [{ provide: RecurrenceService, useValue: serviceMock }],
    }).compile();

    controller = module.get(RecurrenceController);
  });

  it('deve criar recorrência', async () => {
    serviceMock.create.mockResolvedValue({ id: '1' });

    const req = { user: { id: 'user-1' } } as any;
    const dto = { description: 'Netflix' } as any;

    const result = await controller.create(req, dto);

    expect(result.id).toBe('1');
    expect(serviceMock.create).toHaveBeenCalledWith('user-1', dto);
  });

  it('deve buscar todas recorrências', async () => {
    serviceMock.findAll.mockResolvedValue([{ id: '1' }]);

    const req = { user: { id: 'user-1' } } as any;
    const query = { categoryId: 'cat-1' } as any;

    const result = await controller.findAll(req, query);

    expect(serviceMock.findAll).toHaveBeenCalledWith('user-1', query);
    expect(result).toEqual([{ id: '1' }]);
  });

  it('deve buscar uma recorrência', async () => {
    serviceMock.findOne.mockResolvedValue({ id: '1' });

    const req = { user: { id: 'user-1' } } as any;

    const result = await controller.findOne(req, '1');

    expect(serviceMock.findOne).toHaveBeenCalledWith('user-1', '1');
    expect(result).toEqual({ id: '1' });
  });

  it('deve atualizar recorrência', async () => {
    serviceMock.update.mockResolvedValue({ id: '1', description: 'Novo' });

    const req = { user: { id: 'user-1' } } as any;
    const dto = {
      applyScope: RecurrenceApplyScope.THIS,
      description: 'Novo',
    } as any;

    const result = await controller.update(req, '1', dto);

    expect(serviceMock.update).toHaveBeenCalledWith('user-1', '1', dto);
    expect(result.description).toBe('Novo');
  });

  it('deve remover recorrência', async () => {
    serviceMock.remove.mockResolvedValue({ id: '1' });

    const req = { user: { id: 'user-1' } } as any;
    const query = { scope: RecurrenceDeleteScope.THIS } as any;

    const result = await controller.remove(req, '1', query);

    expect(serviceMock.remove).toHaveBeenCalledWith(
      'user-1',
      '1',
      query,
    );
    expect(result.id).toBe('1');
  });

  it('deve propagar erro do service no create', async () => {
    serviceMock.create.mockRejectedValue(new Error('fail'));

    const req = { user: { id: 'user-1' } } as any;

    await expect(
      controller.create(req, {} as any),
    ).rejects.toThrow('fail');
  });

  it('deve propagar erro do service no update', async () => {
    serviceMock.update.mockRejectedValue(new Error('fail'));

    const req = { user: { id: 'user-1' } } as any;

    await expect(
      controller.update(req, '1', {} as any),
    ).rejects.toThrow('fail');
  });
});