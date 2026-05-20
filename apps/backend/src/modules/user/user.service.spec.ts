import { Test, TestingModule } from '@nestjs/testing'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { UserService } from './user.service'
import { PrismaService } from '@common/prisma/prisma.service'
import { SupabaseService } from '@modules/supabase/supabase.service'

function createSupabaseMock() {
  return {
    auth: {
      admin: {
        deleteUser: jest.fn(),
        updateUserById: jest.fn(),
      },
    },
  }
}

describe('UserService', () => {
  let service: UserService
  let prismaMock: { user: { findUnique: jest.Mock; delete: jest.Mock; update: jest.Mock } }
  let supabaseMock: ReturnType<typeof createSupabaseMock>

  const userId = '11111111-1111-1111-1111-111111111111'
  const prismaUser = { id: userId, email: 'danilo@test.com', name: 'Danilo' }

  beforeEach(async () => {
    prismaMock = {
      user: {
        findUnique: jest.fn(),
        delete: jest.fn(),
        update: jest.fn(),
      },
    }
    supabaseMock = createSupabaseMock()

    jest.spyOn(console, 'error').mockImplementation(() => {})

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: SupabaseService, useValue: supabaseMock },
      ],
    }).compile()

    service = module.get(UserService)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('getUser', () => {
    it('should return the user profile when found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(prismaUser)

      const result = await service.getUser({ userId })

      expect(result).toEqual({
        user: { id: userId, email: prismaUser.email, name: prismaUser.name },
      })
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({ where: { id: userId } })
    })

    it('should throw NotFoundException when user does not exist', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null)

      await expect(service.getUser({ userId })).rejects.toThrow(NotFoundException)
      await expect(service.getUser({ userId })).rejects.toThrow('Usuário não encontrado')
    })
  })

  describe('deleteUser', () => {
    it('should delete from Prisma then from Supabase and return success', async () => {
      prismaMock.user.delete.mockResolvedValue(prismaUser)
      supabaseMock.auth.admin.deleteUser.mockResolvedValue({ error: null })

      const result = await service.deleteUser({ userId })

      expect(result).toEqual({ success: true })
      expect(prismaMock.user.delete).toHaveBeenCalledWith({ where: { id: userId } })
      expect(supabaseMock.auth.admin.deleteUser).toHaveBeenCalledWith(userId)
    })

    it('should throw NotFoundException when Prisma delete fails (user not found)', async () => {
      prismaMock.user.delete.mockRejectedValue(new Error('Record not found'))

      await expect(service.deleteUser({ userId })).rejects.toThrow(NotFoundException)
      expect(supabaseMock.auth.admin.deleteUser).not.toHaveBeenCalled()
    })

    it('should throw BadRequestException when Supabase deleteUser fails after Prisma succeeds', async () => {
      prismaMock.user.delete.mockResolvedValue(prismaUser)
      supabaseMock.auth.admin.deleteUser.mockResolvedValue({ error: { message: 'auth error' } })

      await expect(service.deleteUser({ userId })).rejects.toThrow(BadRequestException)
      await expect(service.deleteUser({ userId })).rejects.toThrow(
        'Falha ao remover usuário do provedor de autenticação',
      )
    })
  })

  describe('updateUser', () => {
    it('should update only name in Prisma (no Supabase call)', async () => {
      prismaMock.user.update.mockResolvedValue({ ...prismaUser, name: 'New Name' })

      const result = await service.updateUser({ userId, name: 'New Name' })

      expect(result).toEqual({ success: true })
      expect(supabaseMock.auth.admin.updateUserById).not.toHaveBeenCalled()
      expect(prismaMock.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: { name: 'New Name' },
      })
    })

    it('should update email in Supabase and Prisma', async () => {
      supabaseMock.auth.admin.updateUserById.mockResolvedValue({ error: null })
      prismaMock.user.update.mockResolvedValue({ ...prismaUser, email: 'new@test.com' })

      const result = await service.updateUser({ userId, email: 'new@test.com' })

      expect(result).toEqual({ success: true })
      expect(supabaseMock.auth.admin.updateUserById).toHaveBeenCalledWith(userId, {
        email: 'new@test.com',
      })
      expect(prismaMock.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: { email: 'new@test.com' },
      })
    })

    it('should update password in Supabase only (no Prisma call)', async () => {
      supabaseMock.auth.admin.updateUserById.mockResolvedValue({ error: null })

      const result = await service.updateUser({ userId, password: 'NewPassword123' })

      expect(result).toEqual({ success: true })
      expect(supabaseMock.auth.admin.updateUserById).toHaveBeenCalledWith(userId, {
        password: 'NewPassword123',
      })
      expect(prismaMock.user.update).not.toHaveBeenCalled()
    })

    it('should throw BadRequestException when no fields are provided', async () => {
      await expect(service.updateUser({ userId })).rejects.toThrow(BadRequestException)
      await expect(service.updateUser({ userId })).rejects.toThrow(
        'Nenhum campo para atualizar foi fornecido',
      )
      expect(supabaseMock.auth.admin.updateUserById).not.toHaveBeenCalled()
      expect(prismaMock.user.update).not.toHaveBeenCalled()
    })

    it('should throw BadRequestException when Supabase updateUserById fails', async () => {
      supabaseMock.auth.admin.updateUserById.mockResolvedValue({ error: { message: 'auth error' } })

      await expect(service.updateUser({ userId, email: 'new@test.com' })).rejects.toThrow(
        BadRequestException,
      )
      await expect(service.updateUser({ userId, email: 'new@test.com' })).rejects.toThrow(
        'Falha ao atualizar credenciais no provedor de autenticação',
      )
      expect(prismaMock.user.update).not.toHaveBeenCalled()
    })

    it('should throw NotFoundException when Prisma update fails (user not found)', async () => {
      supabaseMock.auth.admin.updateUserById.mockResolvedValue({ error: null })
      prismaMock.user.update.mockRejectedValue(new Error('Record not found'))

      await expect(service.updateUser({ userId, name: 'Ghost' })).rejects.toThrow(NotFoundException)
    })
  })
})
