import { IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { SyncRecordDto } from '@common/sync/dto/sync-record.dto'

export class SyncSubCategoryDto extends SyncRecordDto {
  @IsUUID()
  categoryId!: string

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
