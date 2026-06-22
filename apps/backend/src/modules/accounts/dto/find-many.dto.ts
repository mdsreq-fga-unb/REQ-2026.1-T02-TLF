import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { SyncFindManyBaseDto } from '@common/sync/dto/sync-find-many-base.dto'

export class FindManyAccountsDto extends SyncFindManyBaseDto {
  @IsOptional()
  @IsUUID()
  id?: string

  @IsOptional()
  @IsUUID()
  institutionId?: string

  @IsOptional()
  @IsBoolean()
  isActive?: boolean
}
