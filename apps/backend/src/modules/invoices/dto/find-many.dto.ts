import { IsEnum, IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator'
import { InvoiceStatus } from 'generated/prisma/client'
import { SyncFindManyBaseDto } from '@common/sync/dto/sync-find-many-base.dto'

export class FindManyInvoicesDto extends SyncFindManyBaseDto {
  @IsOptional()
  @IsUUID()
  id?: string

  @IsOptional()
  @IsUUID()
  accountId?: string

  @IsOptional()
  @IsEnum(InvoiceStatus)
  status?: InvoiceStatus

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  referenceMonth?: number

  @IsOptional()
  @IsInt()
  @Min(2000)
  referenceYear?: number
}
