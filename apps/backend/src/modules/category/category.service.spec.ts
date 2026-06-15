import { Test, TestingModule } from '@nestjs/testing'
import { CategoryService } from './category.service'
import { PrismaService } from '@common/prisma/prisma.service'
import { NotFoundException, ConflictException } from '@nestjs/common'

const mockPrisma = {
  category: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  transaction: {
    count: jest.fn(),
    updateMany: jest.fn(),
  },
  budget: {
    updateMany: jest.fn(),
  },
  recurrence: {
    updateMany: jest.fn(),
  },
}

const mockCategory = {
  id: 'cat-001',
  userId: 'user-001',
  name: 'Alimentação',
  icon: 'fork',
  color: '#FF0000',
  isDefault: false,
}

describe('CategoryService', () => {
  let service: CategoryService

  beforeEach(async () => {
    jest.resetAllMocks()
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, { provide: PrismaService, useValue: mockPrisma }],
    }).compile()
    service = module.get<CategoryService>(CategoryService)
  })

  describe('create', () => {
    it('deve criar categoria com sucesso', async () => {
      mockPrisma.category.findUnique.mockResolvedValue(null)
      mockPrisma.category.create.mockResolvedValue(mockCategory)
      const result = await service.create('user-001', {
        name: 'Alimentação',
        icon: 'fork',
        color: '#FF0000',
      })
      expect(result).toEqual(mockCategory)
    })

    it('deve lançar ConflictException se nome duplicado', async () => {
      mockPrisma.category.findUnique.mockResolvedValue(mockCategory)
      await expect(
        service.create('user-001', { name: 'Alimentação', icon: 'fork', color: '#FF0000' }),
      ).rejects.toThrow(ConflictException)
    })
  })

  describe('findAll', () => {
    it('deve retornar lista de categorias', async () => {
      mockPrisma.category.findMany.mockResolvedValue([mockCategory])
      const result = await service.findAll('user-001')
      expect(result).toEqual([mockCategory])
    })
  })

  describe('findOne', () => {
    it('deve retornar categoria por id', async () => {
      mockPrisma.category.findUnique.mockResolvedValue(mockCategory)
      const result = await service.findOne('user-001', 'cat-001')
      expect(result).toEqual(mockCategory)
    })

    it('deve lançar NotFoundException se não encontrar', async () => {
      mockPrisma.category.findUnique.mockResolvedValue(null)
      await expect(service.findOne('user-001', 'cat-001')).rejects.toThrow(NotFoundException)
    })
  })

  describe('update', () => {
    it('deve atualizar categoria com sucesso', async () => {
      mockPrisma.category.findUnique.mockResolvedValueOnce(mockCategory).mockResolvedValueOnce(null)
      mockPrisma.category.update.mockResolvedValue({ ...mockCategory, color: '#00FF00' })
      const result = await service.update('user-001', 'cat-001', { color: '#00FF00' })
      expect(result.color).toBe('#00FF00')
    })

    it('deve lançar NotFoundException se não encontrar', async () => {
      mockPrisma.category.findUnique.mockResolvedValue(null)
      await expect(service.update('user-001', 'cat-001', { color: '#000' })).rejects.toThrow(
        NotFoundException,
      )
    })

    it('deve reclassificar transações ao atualizar com newCategoryId', async () => {
      mockPrisma.category.findUnique
        .mockResolvedValueOnce(mockCategory)
        .mockResolvedValueOnce({ ...mockCategory, id: 'cat-002' })
      mockPrisma.transaction.updateMany.mockResolvedValue({ count: 3 })
      mockPrisma.category.update.mockResolvedValue({ ...mockCategory, color: '#00FF00' })
      const result = await service.update('user-001', 'cat-001', { color: '#00FF00' }, 'cat-002')
      expect(result).toBeDefined()
    })
  })

  describe('remove', () => {
    it('deve remover categoria sem reclassificação', async () => {
      mockPrisma.category.findUnique.mockResolvedValue(mockCategory)
      mockPrisma.category.delete.mockResolvedValue(mockCategory)
      const result = await service.remove('user-001', 'cat-001')
      expect(result).toEqual({ message: 'Categoria removida com sucesso' })
    })

    it('deve reclassificar e remover quando newCategoryId informado', async () => {
      mockPrisma.category.findUnique
        .mockResolvedValueOnce(mockCategory)
        .mockResolvedValueOnce({ ...mockCategory, id: 'cat-002' })
      mockPrisma.transaction.updateMany.mockResolvedValue({ count: 3 })
      mockPrisma.category.delete.mockResolvedValue(mockCategory)
      const result = await service.remove('user-001', 'cat-001', 'cat-002')
      expect(result).toEqual({ message: 'Categoria removida com sucesso' })
    })

    it('deve lançar NotFoundException se não encontrar', async () => {
      mockPrisma.category.findUnique.mockResolvedValue(null)
      await expect(service.remove('user-001', 'cat-001')).rejects.toThrow(NotFoundException)
    })
  })
})
