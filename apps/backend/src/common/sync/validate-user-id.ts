import { ForbiddenException } from '@nestjs/common'

export function assertMatchingUserId(authUserId: string, requestUserId: string): void {
  if (authUserId !== requestUserId) {
    throw new ForbiddenException('userId inválido para o token atual')
  }
}
