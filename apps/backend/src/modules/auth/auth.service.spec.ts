import { Test, TestingModule } from '@nestjs/testing'
import { BadRequestException, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SupabaseService } from '../supabase/supabase.service'
import { PrismaService } from '@common/prisma/prisma.service'
import { SeedService } from 'prisma/seed'

function createSupabaseMock() {
  return {
    auth: {
      admin: {
        createUser: jest.fn(),
        deleteUser: jest.fn(),
        signOut: jest.fn(),
      },
      signInWithPassword: jest.fn(),
      refreshSession: jest.fn(),
    },
  }
}

describe('AuthService', () => {
  let service: AuthService
  let supabaseMock: ReturnType<typeof createSupabaseMock>
  let prismaMock: {
    user: { create: jest.Mock; findUnique: jest.Mock }
  }
  let seedMock: { seedDefaultCategories: jest.Mock }

  const registerDto = { name: 'Danilo', email: 'danilo@test.com', password: 'Password123!' }
  const loginDto = { email: 'danilo@test.com', password: 'Password123!' }
  const authUserId = '11111111-1111-1111-1111-111111111111'

  beforeEach(async () => {
    supabaseMock = createSupabaseMock()
    prismaMock = {
      user: {
        create: jest.fn(),
        findUnique: jest.fn(),
      },
    }
    seedMock = { seedDefaultCategories: jest.fn().mockResolvedValue(undefined) }

    jest.spyOn(console, 'error').mockImplementation(() => {})

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: SupabaseService, useValue: supabaseMock },
        { provide: PrismaService, useValue: prismaMock },
        { provide: SeedService, useValue: seedMock },
      ],
    }).compile()

    service = module.get(AuthService)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('register', () => {
    it('should create Supabase user, persist locally, seed categories, return userId', async () => {
      const createdAt = '2026-05-07T12:00:00.000Z'
      supabaseMock.auth.admin.createUser.mockResolvedValue({
        data: { user: { id: authUserId, created_at: createdAt } },
        error: null,
      })
      prismaMock.user.create.mockResolvedValue({
        id: authUserId,
        email: registerDto.email,
        name: registerDto.name,
        createdAt: new Date(createdAt),
      })

      const result = await service.register(registerDto)

      expect(result).toEqual({ userId: authUserId })
      expect(supabaseMock.auth.admin.createUser).toHaveBeenCalledWith({
        email: registerDto.email,
        email_confirm: true,
        password: registerDto.password,
      })
      expect(prismaMock.user.create).toHaveBeenCalled()
      expect(seedMock.seedDefaultCategories).toHaveBeenCalledWith(authUserId)
    })

    it('should throw BadRequestException when Supabase createUser fails', async () => {
      supabaseMock.auth.admin.createUser.mockResolvedValue({
        data: { user: null },
        error: { message: 'Email already registered' },
      })

      await expect(service.register(registerDto)).rejects.toThrow(BadRequestException)
      await expect(service.register(registerDto)).rejects.toThrow('Email already registered')
      expect(prismaMock.user.create).not.toHaveBeenCalled()
    })

    it('should delete Supabase user and throw BadRequestException when prisma create fails', async () => {
      const createdAt = '2026-05-07T12:00:00.000Z'
      supabaseMock.auth.admin.createUser.mockResolvedValue({
        data: { user: { id: authUserId, created_at: createdAt } },
        error: null,
      })
      prismaMock.user.create.mockRejectedValue(new Error('duplicate key'))

      await expect(service.register(registerDto)).rejects.toThrow(BadRequestException)
      expect(supabaseMock.auth.admin.deleteUser).toHaveBeenCalledWith(authUserId)
    })
  })

  describe('login', () => {
    it('should throw UnauthorizedException when signIn fails', async () => {
      supabaseMock.auth.signInWithPassword.mockResolvedValue({
        data: { user: null, session: null },
        error: { message: 'Invalid login' },
      })

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException)
      await expect(service.login(loginDto)).rejects.toThrow('Credenciais inválidas')
    })

    it('should throw UnauthorizedException when local user is missing', async () => {
      supabaseMock.auth.signInWithPassword.mockResolvedValue({
        data: {
          user: { id: authUserId },
          session: { access_token: 'a', refresh_token: 'r' },
        },
        error: null,
      })
      prismaMock.user.findUnique.mockResolvedValue(null)

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException)
      await expect(service.login(loginDto)).rejects.toThrow('Usuário não encontrado')
    })

    it('should throw BadRequestException when session tokens are missing', async () => {
      supabaseMock.auth.signInWithPassword.mockResolvedValue({
        data: {
          user: { id: authUserId },
          session: {},
        },
        error: null,
      })
      prismaMock.user.findUnique.mockResolvedValue({
        id: authUserId,
        email: loginDto.email,
        name: 'N',
      })

      await expect(service.login(loginDto)).rejects.toThrow(BadRequestException)
    })

    it('should return access and refresh tokens on success', async () => {
      supabaseMock.auth.signInWithPassword.mockResolvedValue({
        data: {
          user: { id: authUserId },
          session: {
            access_token: 'access-jwt',
            refresh_token: 'refresh-jwt',
          },
        },
        error: null,
      })
      prismaMock.user.findUnique.mockResolvedValue({
        id: authUserId,
        email: loginDto.email,
        name: 'N',
      })

      const result = await service.login(loginDto)

      expect(result).toEqual({
        user: {
          id: authUserId,
          email: loginDto.email,
          name: 'N',
        },
        accessToken: 'access-jwt',
        refreshToken: 'refresh-jwt',
      })
    })
  })

  describe('logout', () => {
    it('should throw BadRequestException when signOut fails', async () => {
      supabaseMock.auth.admin.signOut.mockResolvedValue({
        error: { message: 'invalid_token' },
      })

      await expect(service.logout('bad-token')).rejects.toThrow(BadRequestException)
      await expect(service.logout('bad-token')).rejects.toThrow('invalid_token')
    })

    it('should return success when signOut succeeds', async () => {
      supabaseMock.auth.admin.signOut.mockResolvedValue({
        error: null,
      })

      const result = await service.logout('valid-access-token')

      expect(result).toEqual({ success: true })
      expect(supabaseMock.auth.admin.signOut).toHaveBeenCalledWith('valid-access-token')
    })
  })

  describe('refreshToken', () => {
    it('should throw UnauthorizedException when refreshSession fails', async () => {
      supabaseMock.auth.refreshSession.mockResolvedValue({
        data: { session: null },
        error: { message: 'expired' },
      })

      await expect(service.refreshToken({ refreshToken: 'old' })).rejects.toThrow(
        UnauthorizedException,
      )
    })

    it('should throw BadRequestException when refreshed session lacks tokens', async () => {
      supabaseMock.auth.refreshSession.mockResolvedValue({
        data: { session: {} },
        error: null,
      })

      await expect(service.refreshToken({ refreshToken: 'old' })).rejects.toThrow(
        BadRequestException,
      )
    })

    it('should return new access and refresh tokens on success', async () => {
      supabaseMock.auth.refreshSession.mockResolvedValue({
        data: {
          session: {
            access_token: 'new-access-jwt',
            refresh_token: 'new-refresh-jwt',
          },
        },
        error: null,
      })

      const result = await service.refreshToken({ refreshToken: 'existing-refresh' })

      expect(result).toEqual({
        accessToken: 'new-access-jwt',
        refreshToken: 'new-refresh-jwt',
      })
      expect(supabaseMock.auth.refreshSession).toHaveBeenCalledWith({
        refresh_token: 'existing-refresh',
      })
    })
  })
})
