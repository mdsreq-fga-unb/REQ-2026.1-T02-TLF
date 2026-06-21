import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { SyncRecordDto } from '@common/sync/dto/sync-record.dto'

export class SyncInstitutionDto extends SyncRecordDto {
  @IsString()
  @IsNotEmpty()
  name!: string

  @IsString()
  @IsNotEmpty()
  color!: string

  @IsOptional()
  @IsString()
  logoUrl?: string | null
}
