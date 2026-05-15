import { AuthUserDto } from './auth-user.dto'
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'

export class LoginRequestDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @Length(5, 255)
  email!: string

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'Password123',
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 100)
  password!: string
}

export class LoginResponseDto {
  @ApiProperty({
    description: 'Perfil persistido localmente (para dispositivos novos sem cache)',
    type: AuthUserDto,
  })
  user!: AuthUserDto

  @ApiProperty({
    description: 'Access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken!: string

  @ApiProperty({
    description: 'Refresh token',
    example: 'v1.refresh_token_value',
  })
  refreshToken!: string
}
