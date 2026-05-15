import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class RegisterDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name!: string

  @ApiProperty({
    description: 'Email do usuário',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  password!: string
}
