import { IsEnum, IsOptional, IsUUID } from 'class-validator'
import { TransactionStatus, TransactionType } from 'generated/prisma/client'
import { SyncFindManyBaseDto } from '@common/sync/dto/sync-find-many-base.dto'

export class FindManyTransactionsDto extends SyncFindManyBaseDto {
  @IsOptional()
  @IsUUID()
  id?: string

  @IsOptional()
  @IsUUID()
  accountId?: string

  @IsOptional()
  @IsUUID()
  categoryId?: string

  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType

  @IsOptional()
  @IsEnum(TransactionStatus)
  status?: TransactionStatus
}
