import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsISO8601, IsOptional } from 'class-validator'

export class ConfirmRecurrenceDto {
  @ApiPropertyOptional({
    example: '2026-06-01T00:00:00.000Z',
    description:
      'Data de referência do mês a ser confirmado (ISO 8601). Quando omitida, usa o mês atual.',
  })
  @IsOptional()
  @IsISO8601()
  referenceDate?: string
}
