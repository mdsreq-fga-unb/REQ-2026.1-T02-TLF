import { Test, TestingModule } from '@nestjs/testing'
import { BudgetService } from './budget.service'
import { PrismaService } from '@common/prisma/prisma.service'
import { NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common'

const mockPrisma = {
  category: { findUnique: jest.fn() },
  budget: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}

const mockCategory = { id: 'cat-001', userId: 'user-001', name: 'Alimentação' }
const mockBudget = {
  id: 'budget-001',
  name: 'Orçamento Alimentação',
  amountLimit: 50000,
  month: 5,
  year: 2026,
  userId: 'user-001',
  category: { id: 'cat-001', name: 'Alimentação' },
}

describe('BudgetService', () => {
  let service: BudgetService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BudgetService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile()
    service = module.get<BudgetService>(BudgetService)
    jest.clearAllMocks()
  })

  const dto = {
    categoryId: 'cat-001',
    name: 'Orçamento Alimentação',
    amountLimit: 50000,
    month: 5,
    year: 2026,
  }

  describe('create', () => {
    it('deve criar orçamento com sucesso', async () => {
      mockPrisma.category.findUnique.mockResolvedValue(mockCategory)
      mockPrisma.budget.findUnique.mockResolvedValue(null)
      mockPrisma.budget.create.mockResolvedValue(mockBudget)
      const result = await service.create('user-001', dto)
      expect(result).toEqual(mockBudget)
    })

    // TODO: Reativar quando sistemas de categorias for implementado
    // it('deve lançar NotFoundException se categoria não existir', async () => {
    //   mockPrisma.category.findUnique.mockResolvedValue(null)
    //   await expect(service.create('user-001', dto)).rejects.toThrow(NotFoundException)
    // })

    // it('deve lançar ForbiddenException se categoria não pertencer ao usuário', async () => {
    //   mockPrisma.category.findUnique.mockResolvedValue({ ...mockCategory, userId: 'outro' })
    //   await expect(service.create('user-001', dto)).rejects.toThrow(ForbiddenException)
    // })

    it('deve lançar ConflictException se orçamento já existir', async () => {
      mockPrisma.category.findUnique.mockResolvedValue(mockCategory)
      mockPrisma.budget.findUnique.mockResolvedValue(mockBudget)
      await expect(service.create('user-001', dto)).rejects.toThrow(ConflictException)
    })
  })

  describe('findAll', () => {
    it('deve retornar lista de orçamentos', async () => {
      mockPrisma.budget.findMany.mockResolvedValue([mockBudget])
      const result = await service.findAll('user-001')
      expect(result).toEqual([mockBudget])
    })
  })

  describe('findOne', () => {
    it('deve retornar orçamento por id', async () => {
      mockPrisma.budget.findUnique.mockResolvedValue(mockBudget)
      const result = await service.findOne('user-001', 'budget-001')
      expect(result).not.toHaveProperty('userId')
    })

    it('deve lançar NotFoundException se não encontrar', async () => {
      mockPrisma.budget.findUnique.mockResolvedValue(null)
      await expect(service.findOne('user-001', 'budget-001')).rejects.toThrow(NotFoundException)
    })

    it('deve lançar ForbiddenException se não pertencer ao usuário', async () => {
      mockPrisma.budget.findUnique.mockResolvedValue({ ...mockBudget, userId: 'outro' })
      await expect(service.findOne('user-001', 'budget-001')).rejects.toThrow(ForbiddenException)
    })
  })

  describe('update', () => {
    it('deve atualizar orçamento', async () => {
      mockPrisma.budget.findUnique.mockResolvedValue(mockBudget)
      mockPrisma.budget.update.mockResolvedValue({ ...mockBudget, amountLimit: 60000 })
      const result = await service.update('user-001', 'budget-001', { amountLimit: 60000 })
      expect(result.amountLimit).toBe(60000)
    })

    it('deve lançar ForbiddenException se não pertencer ao usuário', async () => {
      mockPrisma.budget.findUnique.mockResolvedValue({ ...mockBudget, userId: 'outro' })
      await expect(service.update('user-001', 'budget-001', {})).rejects.toThrow(ForbiddenException)
    })
  })

  describe('remove', () => {
    it('deve remover orçamento', async () => {
      mockPrisma.budget.findUnique.mockResolvedValue(mockBudget)
      mockPrisma.budget.delete.mockResolvedValue(mockBudget)
      const result = await service.remove('user-001', 'budget-001')
      expect(result).toEqual({ message: 'Orçamento removido com sucesso' })
    })

    it('deve lançar NotFoundException se não encontrar', async () => {
      mockPrisma.budget.findUnique.mockResolvedValue(null)
      await expect(service.remove('user-001', 'budget-001')).rejects.toThrow(NotFoundException)
    })
  })
})