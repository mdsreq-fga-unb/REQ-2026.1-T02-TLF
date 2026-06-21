import { IsInt, IsNotEmpty, IsString, IsUUID, Max, Min } from 'class-validator'
import { SyncRecordDto } from '@common/sync/dto/sync-record.dto'

export class SyncBudgetDto extends SyncRecordDto {
  @IsUUID()
  categoryId!: string

  @IsString()
  @IsNotEmpty()
  name!: string

  @IsInt()
  @Min(1)
  amountLimit!: number

  @IsInt()
  @Min(1)
  @Max(12)
  month!: number

  @IsInt()
  @Min(2000)
  year!: number
}
