import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class ReclassifyCategoryDto {
  @ApiProperty({ required: false, description: 'ID da categoria destino para reclassificação' })
  @IsOptional()
  @IsString()
  newCategoryId?: string
}
