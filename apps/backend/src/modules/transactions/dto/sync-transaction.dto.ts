import { IsEnum, IsInt, IsISO8601, IsOptional, IsString, IsUUID, Min } from 'class-validator'
import { TransactionStatus, TransactionType } from 'generated/prisma/client'
import { SyncRecordDto } from '@common/sync/dto/sync-record.dto'

export class SyncTransactionDto extends SyncRecordDto {
  @IsUUID()
  institutionId!: string

  @IsOptional()
  @IsUUID()
  categoryId?: string | null

  @IsOptional()
  @IsUUID()
  subCategoryId?: string | null

  @IsEnum(TransactionType)
  type!: TransactionType

  @IsInt()
  @Min(1)
  amount!: number

  @IsOptional()
  @IsString()
  description?: string | null

  @IsOptional()
  @IsISO8601()
  date?: string

  @IsOptional()
  @IsEnum(TransactionStatus)
  status?: TransactionStatus

  @IsOptional()
  @IsUUID()
  invoiceId?: string | null

  @IsOptional()
  @IsUUID()
  recurrenceId?: string | null

  @IsOptional()
  @IsUUID()
  destinationInstitutionId?: string | null

  @IsOptional()
  @IsString()
  installmentReference?: string | null

  @IsOptional()
  @IsInt()
  installmentNumber?: number | null

  @IsOptional()
  @IsInt()
  installmentTotal?: number | null

  @IsOptional()
  @IsString()
  receiptUrl?: string | null

  @IsOptional()
  @IsString()
  externalId?: string | null
}
