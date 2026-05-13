import { ApiProperty } from '@nestjs/swagger'

export class DeleteUserRequestDto {
  userId!: string
}

export class DeleteUserResponseDto {
  @ApiProperty({ example: true })
  success!: boolean
}
