import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsUUID, IsEnum, IsInt, Min } from 'class-validator'
import { TransactionType } from '../../../../generated/prisma/client'
export class FilterTransactionsDto {
  @ApiPropertyOptional({
    enum: TransactionType,
    example: TransactionType.EXPENSE,
    description: 'Tipo da transação para filtro',
  })
  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType

  @ApiPropertyOptional({
    example: '3cec466a-096d-4016-bb10-bcc9b94a7d36',
    description: 'ID da categoria usado como filtro',
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string

  @ApiPropertyOptional({
    example: 1,
    description: 'Número da página',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number

  @ApiPropertyOptional({
    example: 20,
    description: 'Itens por página',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number
}
