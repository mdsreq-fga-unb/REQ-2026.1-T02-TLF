import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator'
import { SyncRecordDto } from '@common/sync/dto/sync-record.dto'

export class SyncRecurrenceDto extends SyncRecordDto {
  @IsUUID()
  accountId!: string

  @IsOptional()
  @IsUUID()
  categoryId?: string | null

  @IsOptional()
  @IsUUID()
  subCategoryId?: string | null

  @IsString()
  @IsNotEmpty()
  description!: string

  @IsInt()
  @Min(1)
  amount!: number

  @IsOptional()
  @IsBoolean()
  isActive?: boolean

  @IsInt()
  @Min(1)
  @Max(31)
  chargeDate!: number

  @IsOptional()
  startDate?: string

  @IsOptional()
  endDate?: string | null
}
