import { ApiProperty } from '@nestjs/swagger'
import {
  IsEnum,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'
import { TransactionType, TransactionStatus } from '../../../../generated/prisma/enums'

export class CreateTransactionDto {
  @ApiProperty({ example: 'uuid-da-conta' })
  @IsString()
  @IsNotEmpty()
  accountId!: string

  @ApiProperty({ example: 'uuid-da-categoria' })
  @IsString()
  @IsNotEmpty()
  categoryId!: string

  @ApiProperty({ example: 'uuid-da-subcategoria', required: false })
  @IsOptional()
  @IsString()
  subCategoryId?: string

  @ApiProperty({ enum: TransactionType, example: TransactionType.EXPENSE })
  @IsEnum(TransactionType)
  type!: TransactionType

  @ApiProperty({ example: 5000, description: 'Valor em centavos' })
  @IsInt()
  @Min(1)
  amount!: number

  @ApiProperty({ example: 'Almoço', required: false })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({ example: '2026-05-02T00:00:00.000Z', required: false })
  @IsOptional()
  @IsISO8601()
  date?: string

  @ApiProperty({ enum: TransactionStatus, required: false })
  @IsOptional()
  @IsEnum(TransactionStatus)
  status?: TransactionStatus
}