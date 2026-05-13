import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString, IsStrongPassword, Length } from 'class-validator'
import { Transform } from 'class-transformer'

export class UpdateUserRequestDto {
  @ApiPropertyOptional({
    description: 'Novo nome do usuário',
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  @Length(3, 100)
  name?: string

  @ApiPropertyOptional({
    description: 'Novo e-mail do usuário',
    example: 'john.doe@example.com',
  })
  @IsOptional()
  @IsEmail()
  @Transform(({ value }) => value.trim())
  @Length(5, 255)
  email?: string

  @ApiPropertyOptional({
    description:
      'Nova senha — deve ter no mínimo 8 caracteres, 1 maiúscula, 1 minúscula e 1 número',
    example: 'NewPassword123',
  })
  @IsOptional()
  @IsString()
  @IsStrongPassword(
    { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 },
    {
      message:
        'A senha deve ter no mínimo 8 caracteres, com pelo menos 1 letra maiúscula, 1 letra minúscula e 1 número.',
    },
  )
  @Length(8, 100)
  password?: string
}

export class UpdateUserResponseDto {
  @ApiProperty({ example: true })
  success!: boolean
}
