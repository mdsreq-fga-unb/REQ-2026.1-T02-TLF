import { Test, TestingModule } from '@nestjs/testing'
import { RecurrenceController } from './recurrence.controller'
import { RecurrenceService } from './recurrence.service'
import { AuthGuard } from '@modules/auth/context/auth.guard'
import { RecurrenceApplyScope } from './enums/recurrence-apply-scope.enum'
import { RecurrenceDeleteScope } from './enums/recurrence-delete-scope.enum'

const recurrenceServiceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}

describe('RecurrenceController', () => {
  let controller: RecurrenceController

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecurrenceController],
      providers: [
        {
          provide: RecurrenceService,
          useValue: recurrenceServiceMock,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile()

    controller = module.get<RecurrenceController>(RecurrenceController)
  })

  describe('create', () => {
    it('deve criar recorrência com sucesso', async () => {
      const dto = {
        accountId: 'acc-1',
        categoryId: 'cat-1',
        description: 'Netflix',
        amount: 2990,
        chargeDate: 10,
        startDate: new Date().toISOString(),
        isActive: true,
      }

      recurrenceServiceMock.create.mockResolvedValue({ id: 'rec-1' })

      const result = await controller.create('user-1', dto as any)

      expect(recurrenceServiceMock.create).toHaveBeenCalledWith('user-1', dto)

      expect(result).toEqual({ id: 'rec-1' })
    })
  })

  describe('findAll', () => {
    it('deve listar recorrências do usuário', async () => {
      const query = { categoryId: 'cat-1' }

      recurrenceServiceMock.findAll.mockResolvedValue([{ id: 'rec-1' }])

      const result = await controller.findAll('user-1', query as any)

      expect(recurrenceServiceMock.findAll).toHaveBeenCalledWith('user-1', query)

      expect(result).toEqual([{ id: 'rec-1' }])
    })
  })

  describe('findOne', () => {
    it('deve retornar uma recorrência por id', async () => {
      recurrenceServiceMock.findOne.mockResolvedValue({ id: 'rec-1' })

      const result = await controller.findOne('user-1', 'rec-1')

      expect(recurrenceServiceMock.findOne).toHaveBeenCalledWith('user-1', 'rec-1')

      expect(result).toEqual({ id: 'rec-1' })
    })
  })

  describe('update', () => {
    it('deve atualizar recorrência com scope padrão THIS', async () => {
      const dto = {
        description: 'Netflix Premium',
        applyScope: RecurrenceApplyScope.THIS,
      }

      recurrenceServiceMock.update.mockResolvedValue({
        id: 'rec-1',
        description: 'Netflix Premium',
      })

      const result = await controller.update('user-1', 'rec-1', dto as any)

      expect(recurrenceServiceMock.update).toHaveBeenCalledWith('user-1', 'rec-1', dto)

      expect(result.description).toBe('Netflix Premium')
    })
  })

  describe('remove', () => {
    it('deve remover recorrência com scope THIS', async () => {
      const query = {
        scope: RecurrenceDeleteScope.THIS,
      }

      recurrenceServiceMock.remove.mockResolvedValue({ id: 'rec-1' })

      const result = await controller.remove('user-1', 'rec-1', query as any)

      expect(recurrenceServiceMock.remove).toHaveBeenCalledWith('user-1', 'rec-1', query)

      expect(result).toEqual({ id: 'rec-1' })
    })
  })
})
