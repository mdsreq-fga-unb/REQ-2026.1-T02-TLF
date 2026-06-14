import { IsNotEmpty, IsString } from 'class-validator'
import { SyncRecordDto } from '@common/sync/dto/sync-record.dto'

export class SyncCategoryDto extends SyncRecordDto {
  @IsString()
  @IsNotEmpty()
  name!: string

  @IsString()
  @IsNotEmpty()
  icon!: string

  @IsString()
  @IsNotEmpty()
  color!: string
}
