import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, Matches } from 'class-validator'

export class UpdateCategoryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  icon?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Matches(/^#([A-Fa-f0-9]{6})$/, { message: 'Cor deve ser um hexadecimal válido ex: #FF5733' })
  color?: string

  @ApiProperty({ required: false, description: 'ID da categoria destino para reclassificação' })
  @IsOptional()
  @IsString()
  newCategoryId?: string
}