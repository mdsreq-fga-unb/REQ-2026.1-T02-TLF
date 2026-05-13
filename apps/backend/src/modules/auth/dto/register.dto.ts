import { AuthUserDto } from './auth-user.dto'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length } from 'class-validator'
import { Transform } from 'class-transformer'

export class RegisterRequestDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @Length(3, 100)
  name!: string

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

export class RegisterServiceResponseDto {
  @ApiProperty({
    description: 'ID do usuário',
    example: '1234567890',
  })
  userId!: string
}

export class RegisterResponseDto {
  @ApiProperty({
    description: 'Mesmo payload de usuário do login, obtido ao abrir sessão após o cadastro.',
    type: AuthUserDto,
  })
  user!: AuthUserDto

  @ApiProperty({
    description: 'Token de acesso',
    example: '1234567890',
  })
  @IsString()
  accessToken!: string

  @ApiProperty({
    description: 'Token de atualização',
    example: '1234567890',
  })
  refreshToken!: string
}
