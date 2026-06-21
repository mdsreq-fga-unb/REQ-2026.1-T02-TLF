import { IsEnum, IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator'
import { InvoicePaymentStatus, InvoiceStatus } from 'generated/prisma/client'
import { SyncRecordDto } from '@common/sync/dto/sync-record.dto'

export class SyncInvoiceDto extends SyncRecordDto {
  @IsUUID()
  accountId!: string

  @IsOptional()
  @IsEnum(InvoiceStatus)
  status?: InvoiceStatus

  @IsOptional()
  @IsEnum(InvoicePaymentStatus)
  paymentStatus?: InvoicePaymentStatus

  @IsInt()
  @Min(1)
  @Max(12)
  referenceMonth!: number

  @IsInt()
  @Min(2000)
  referenceYear!: number

  @IsOptional()
  @IsInt()
  totalAmount?: number

  @IsOptional()
  @IsInt()
  paidAmount?: number

  @IsInt()
  @Min(1)
  closingDay!: number

  @IsInt()
  @Min(1)
  dueDay!: number
}
