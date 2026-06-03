import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsInt, IsISO8601, IsOptional, IsString, IsUUID, Min } from 'class-validator'
import { TransactionType, TransactionStatus } from '../../../../generated/prisma/client'

export class CreateTransactionDto {
  @ApiProperty({
    example: 'ae73db85-6c25-4b8d-91b2-d0cda2830c65',
    description: 'ID da conta bancária',
  })
  @IsUUID()
  accountId!: string

  @ApiProperty({
    example: '3cec466a-096d-4016-bb10-bcc9b94a7d36',
    description: 'ID da categoria da transação',
  })
  @IsUUID()
  categoryId!: string

  @ApiPropertyOptional({
    example: 'a55d44df-6f3b-480d-9db4-388235e931bc',
    description: 'ID da subcategoria da transação',
  })
  @IsOptional()
  @IsUUID()
  subCategoryId?: string

  @ApiProperty({
    enum: TransactionType,
    example: TransactionType.EXPENSE,
    description: 'Tipos válidos da transação',
  })
  @IsEnum(TransactionType)
  type!: TransactionType

  @ApiProperty({
    example: 5000,
    minimum: 1,
    description: 'Valor monetário da transação em centavos (ex: R$ 50,00 = 5000)',
  })
  @IsInt()
  @Min(1)
  amount!: number //em centavos

  @ApiPropertyOptional({
    example: 'Almoço',
    description: 'Descrição opcional da transação por parte do usuário',
  })
  @IsOptional()
  @IsString()
  description?: string

  @ApiPropertyOptional({
    example: '2026-05-02T00:00:00.000Z',
    description: 'Data da transação no formato ISO 8601',
  })
  @IsOptional()
  @IsISO8601()
  date?: string

  @ApiPropertyOptional({
    enum: TransactionStatus,
    example: TransactionStatus.COMPLETED,
    description: 'Estados possíveis da transação',
  })
  @IsOptional()
  @IsEnum(TransactionStatus)
  status?: TransactionStatus

  @ApiPropertyOptional({
    example: '077e482b-dfd9-48cb-9b79-15a3c25a83a5',
    description: 'ID da fatura associada',
  })
  @IsOptional()
  @IsUUID()
  invoiceId?: string

  @ApiPropertyOptional({
    example: '64021cd7-e3a1-458f-b8df-e8e2b92e8747',
    description: 'ID da assinatura',
  })
  @IsOptional()
  @IsUUID()
  recurrenceId?: string

  @ApiPropertyOptional({
    example: '5b6d0359-79e2-4e67-9d6f-81bc96e76095',
    description: 'ID da conta destinatária da transação',
  })
  @IsOptional()
  @IsUUID()
  destinationAccountId?: string

  @ApiPropertyOptional({
    example: 3,
    description: 'Número da parcela atual',
  })
  @IsOptional()
  @IsInt()
  installmentNumber?: number

  @ApiPropertyOptional({
    example: 12,
    description: 'Total de parcelas',
  })
  @IsOptional()
  @IsInt()
  installmentTotal?: number
}
