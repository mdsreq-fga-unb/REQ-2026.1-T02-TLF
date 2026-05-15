import { ApiProperty } from '@nestjs/swagger'

export class LogoutResponseDto {
  @ApiProperty({
    description: 'Logout realizado com sucesso',
    example: true,
  })
  success!: boolean
}
