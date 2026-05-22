import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class ReclassifyCategoryDto {
  @ApiProperty({ example: 'uuid-da-nova-categoria', description: 'ID da categoria destino para reclassificação das transações' })
  @IsString()
  @IsNotEmpty()
  newCategoryId!: string
}