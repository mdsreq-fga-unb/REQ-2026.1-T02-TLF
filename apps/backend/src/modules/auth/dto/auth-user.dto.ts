import { ApiProperty } from '@nestjs/swagger'

export class AuthUserDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id!: string

  @ApiProperty({ example: 'John Doe' })
  name!: string

  @ApiProperty({ example: 'john.doe@example.com' })
  email!: string
}
