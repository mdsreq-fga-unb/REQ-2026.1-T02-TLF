import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { AuthGuard } from '@modules/auth/context/auth.guard'

describe('UserController', () => {
  let controller: UserController
  let userService: jest.Mocked<Pick<UserService, 'getUser' | 'deleteUser' | 'updateUser'>>

  const userId = '11111111-1111-1111-1111-111111111111'

  beforeEach(async () => {
    userService = {
      getUser: jest.fn(),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: userService }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile()

    controller = module.get(UserController)
  })

  it('should delegate getUser to UserService with the verified userId', async () => {
    const expected = { user: { id: userId, email: 'a@test.com', name: 'A' } }
    userService.getUser.mockResolvedValue(expected)

    const result = await controller.getUser(userId)

    expect(userService.getUser).toHaveBeenCalledWith({ userId })
    expect(result).toEqual(expected)
  })

  it('should delegate deleteUser to UserService with the verified userId', async () => {
    userService.deleteUser.mockResolvedValue({ success: true })

    const result = await controller.deleteUser(userId)

    expect(userService.deleteUser).toHaveBeenCalledWith({ userId })
    expect(result).toEqual({ success: true })
  })

  it('should delegate updateUser to UserService merging userId and body', async () => {
    const body = { name: 'New Name' }
    userService.updateUser.mockResolvedValue({ success: true })

    const result = await controller.updateUser(userId, body)

    expect(userService.updateUser).toHaveBeenCalledWith({ userId, ...body })
    expect(result).toEqual({ success: true })
  })
})
