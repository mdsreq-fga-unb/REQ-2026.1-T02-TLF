import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Matches } from 'class-validator'

export class CreateCategoryDto {
  @ApiProperty({ example: 'Alimentação' })
  @IsString()
  @IsNotEmpty()
  name!: string

  @ApiProperty({ example: 'fork', description: 'Nome do ícone' })
  @IsString()
  @IsNotEmpty()
  icon!: string

  @ApiProperty({ example: '#FF5733', description: 'Cor em hexadecimal' })
  @IsString()
  @Matches(/^#([A-Fa-f0-9]{6})$/, { message: 'Cor deve ser um hexadecimal válido ex: #FF5733' })
  color!: string
}