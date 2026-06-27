import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsUUID, IsInt, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class FilterRecurrenceDto {
  @ApiPropertyOptional({
    example: '3cec466a-096d-4016-bb10-bcc9b94a7d36',
    description: 'Filtra recorrências pela categoria',
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string

  @ApiPropertyOptional({
    example: 1,
    description: 'Número da página',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number

  @ApiPropertyOptional({
    example: 20,
    description: 'Itens por página',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number
}
