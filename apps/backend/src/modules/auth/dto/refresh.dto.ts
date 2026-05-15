import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'
import { Transform } from 'class-transformer'

export class RefreshRequestDto {
  @ApiProperty({
    description: 'Refresh token',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @Length(10, 255)
  refreshToken!: string
}

export class RefreshResponseDto {
  @ApiProperty({
    description: 'Access token',
    example: '1234567890',
  })
  accessToken!: string
  @ApiProperty({
    description: 'Refresh token',
    example: '1234567890',
  })
  refreshToken!: string
}
