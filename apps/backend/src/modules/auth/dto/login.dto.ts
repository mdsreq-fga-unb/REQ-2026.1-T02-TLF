import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { Length } from 'class-validator'

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
    description:
      'Senha do usuário deve conter pelo menos 8 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 número',
    example: 'Password123',
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    },
    {
      message:
        'A senha deve ter no mínimo 8 caracteres, com pelo menos 1 letra maiúscula, 1 letra minúscula e 1 número.',
    },
  )
  @Length(8, 100)
  password!: string
}

export class LoginResponseDto {
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
