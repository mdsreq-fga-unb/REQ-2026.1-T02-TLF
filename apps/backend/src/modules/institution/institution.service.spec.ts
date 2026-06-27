import { Test, TestingModule } from '@nestjs/testing'
import { InstitutionService } from './institution.service'
import { PrismaService } from '@common/prisma/prisma.service'
import { NotFoundException, ConflictException, BadRequestException } from '@nestjs/common'

const mockPrisma = {
  institution: {
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  account: {
    count: jest.fn(),
  },
  transaction: {
    updateMany: jest.fn(),
  },
  $transaction: jest.fn(),
}

const mockInstitution = {
  id: 'inst-001',
  userId: 'user-001',
  name: 'Nubank',
  color: '#8A05BE',
  icon: 'landmark',
  logoUrl: null,
}

describe('InstitutionService', () => {
  let service: InstitutionService

  beforeEach(async () => {
    jest.resetAllMocks()
    mockPrisma.$transaction.mockImplementation(
      async <T>(callback: (tx: typeof mockPrisma) => T): Promise<T> => callback(mockPrisma),
    )
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstitutionService, { provide: PrismaService, useValue: mockPrisma }],
    }).compile()
    service = module.get<InstitutionService>(InstitutionService)
  })

  const dto = { name: 'Nubank', color: '#8A05BE' }

  describe('create', () => {
    it('deve criar instituição com sucesso', async () => {
      mockPrisma.institution.findFirst.mockResolvedValue(null)
      mockPrisma.institution.create.mockResolvedValue(mockInstitution)
      const result = await service.create('user-001', dto)
      expect(result).toEqual(mockInstitution)
    })

    it('deve lançar ConflictException se nome duplicado', async () => {
      mockPrisma.institution.findFirst.mockResolvedValue(mockInstitution)
      await expect(service.create('user-001', dto)).rejects.toThrow(ConflictException)
    })
  })

  describe('findAll', () => {
    it('deve retornar lista de instituições', async () => {
      mockPrisma.institution.findMany.mockResolvedValue([mockInstitution])
      const result = await service.findAll('user-001')
      expect(result).toEqual([mockInstitution])
    })
  })

  describe('findOne', () => {
    it('deve retornar instituição por id', async () => {
      mockPrisma.institution.findUnique.mockResolvedValue(mockInstitution)
      const result = await service.findOne('user-001', 'inst-001')
      expect(result).toEqual(mockInstitution)
    })

    it('deve lançar NotFoundException se não encontrar', async () => {
      mockPrisma.institution.findUnique.mockResolvedValue(null)
      await expect(service.findOne('user-001', 'inst-001')).rejects.toThrow(NotFoundException)
    })
  })

  describe('update', () => {
    it('deve atualizar instituição com sucesso', async () => {
      mockPrisma.institution.findUnique.mockResolvedValueOnce(mockInstitution)
      mockPrisma.institution.findFirst.mockResolvedValue(null)
      mockPrisma.institution.update.mockResolvedValue({ ...mockInstitution, color: '#000000' })
      const result = await service.update('user-001', 'inst-001', { color: '#000000' })
      expect(result.color).toBe('#000000')
    })

    it('deve lançar NotFoundException se não encontrar', async () => {
      mockPrisma.institution.findUnique.mockResolvedValue(null)
      await expect(service.update('user-001', 'inst-001', {})).rejects.toThrow(NotFoundException)
    })

    it('deve lançar ConflictException se nome duplicado', async () => {
      mockPrisma.institution.findUnique.mockResolvedValueOnce(mockInstitution)
      mockPrisma.institution.findFirst.mockResolvedValue({ ...mockInstitution, id: 'inst-002' })
      await expect(service.update('user-001', 'inst-001', { name: 'Nubank' })).rejects.toThrow(
        ConflictException,
      )
    })
  })

  describe('remove', () => {
    it('deve remover instituição sem contas', async () => {
      mockPrisma.institution.findUnique.mockResolvedValue(mockInstitution)
      mockPrisma.account.count.mockResolvedValue(0)
      mockPrisma.institution.delete.mockResolvedValue(mockInstitution)
      const result = await service.remove('user-001', 'inst-001')
      expect(result).toEqual({ message: 'Instituição removida com sucesso' })
      expect(mockPrisma.transaction.updateMany).toHaveBeenCalledWith({
        where: { destinationInstitutionId: 'inst-001' },
        data: { destinationInstitutionId: null, updatedAt: expect.any(Date) },
      })
    })

    it('deve lançar BadRequestException se houver contas vinculadas', async () => {
      mockPrisma.institution.findUnique.mockResolvedValue(mockInstitution)
      mockPrisma.account.count.mockResolvedValue(2)
      await expect(service.remove('user-001', 'inst-001')).rejects.toThrow(BadRequestException)
    })

    it('deve lançar NotFoundException se não encontrar', async () => {
      mockPrisma.institution.findUnique.mockResolvedValue(null)
      await expect(service.remove('user-001', 'inst-001')).rejects.toThrow(NotFoundException)
    })
  })
})
