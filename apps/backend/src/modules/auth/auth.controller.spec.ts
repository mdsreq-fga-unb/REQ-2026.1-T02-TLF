import { InternalServerErrorException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthGuard } from './context/auth.guard'
import type { Request } from 'express'

describe('AuthController', () => {
  let controller: AuthController
  let authService: jest.Mocked<Pick<AuthService, 'register' | 'login' | 'logout' | 'refreshToken'>>

  beforeEach(async () => {
    authService = {
      register: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
      refreshToken: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile()

    controller = module.get(AuthController)
  })

  it('should register, then login returning user and tokens', async () => {
    const dto = { name: 'A', email: 'a@test.com', password: 'Pass123!' }
    const prismaUser = { id: 'u1', name: 'A', email: 'a@test.com' }

    authService.register.mockResolvedValue({ userId: 'u1' })
    authService.login.mockResolvedValue({
      user: prismaUser,
      accessToken: 'at',
      refreshToken: 'rt',
    })

    const result = await controller.register(dto)

    expect(authService.register).toHaveBeenCalledWith(dto)
    expect(authService.login).toHaveBeenCalledWith({ email: dto.email, password: dto.password })
    expect(result).toEqual({
      user: prismaUser,
      accessToken: 'at',
      refreshToken: 'rt',
    })
  })

  it('should throw when login user id mismatches register userId', async () => {
    const dto = { name: 'A', email: 'a@test.com', password: 'Pass123!' }
    authService.register.mockResolvedValue({ userId: 'u1' })
    authService.login.mockResolvedValue({
      user: { id: 'other', name: 'A', email: dto.email },
      accessToken: 'at',
      refreshToken: 'rt',
    })

    await expect(controller.register(dto)).rejects.toThrow(InternalServerErrorException)
    expect(authService.login).toHaveBeenCalled()
  })

  it('should delegate login to AuthService', async () => {
    const dto = { email: 'a@test.com', password: 'Pass123' }
    const user = { id: 'uid', name: 'N', email: 'a@test.com' }
    authService.login.mockResolvedValue({
      user,
      accessToken: 'a',
      refreshToken: 'r',
    })

    const result = await controller.login(dto)

    expect(authService.login).toHaveBeenCalledWith(dto)
    expect(result).toEqual({
      user,
      accessToken: 'a',
      refreshToken: 'r',
    })
  })

  it('should delegate logout using accessToken from request', async () => {
    authService.logout.mockResolvedValue({ success: true })
    const req = { accessToken: 'jwt-from-guard' } as Request

    const result = await controller.logout(req)

    expect(authService.logout).toHaveBeenCalledWith('jwt-from-guard')
    expect(result).toEqual({ success: true })
  })

  it('should delegate refresh to AuthService', async () => {
    const dto = { refreshToken: 'rt' }
    authService.refreshToken.mockResolvedValue({
      accessToken: 'na',
      refreshToken: 'nr',
    })

    const result = await controller.refresh(dto)

    expect(authService.refreshToken).toHaveBeenCalledWith(dto)
    expect(result).toEqual({ accessToken: 'na', refreshToken: 'nr' })
  })
})
