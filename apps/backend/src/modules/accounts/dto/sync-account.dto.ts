import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator'
import { AccountType, Currency } from 'generated/prisma/client'
import { SyncRecordDto } from '@common/sync/dto/sync-record.dto'

export class SyncAccountDto extends SyncRecordDto {
  @IsUUID()
  institutionId!: string

  @IsString()
  @IsNotEmpty()
  name!: string

  @IsOptional()
  @IsEnum(AccountType)
  type?: AccountType

  @IsOptional()
  @IsInt()
  balance?: number

  @IsOptional()
  @IsInt()
  @Min(1)
  closingDay?: number | null

  @IsOptional()
  @IsInt()
  @Min(1)
  dueDay?: number | null

  @IsOptional()
  @IsInt()
  creditLimit?: number | null

  @IsOptional()
  @IsEnum(Currency)
  currency?: Currency

  @IsOptional()
  @IsBoolean()
  isActive?: boolean
}
