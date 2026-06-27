import { ApiProperty } from '@nestjs/swagger'

export class GetUserRequestDto {
  userId!: string
}

export class UserProfileDto {
  @ApiProperty({ example: '11111111-1111-1111-1111-111111111111' })
  id!: string

  @ApiProperty({ example: 'john.doe@example.com' })
  email!: string

  @ApiProperty({ example: 'John Doe' })
  name!: string
}

export class GetUserResponseDto {
  @ApiProperty({ type: () => UserProfileDto })
  user!: UserProfileDto
}
