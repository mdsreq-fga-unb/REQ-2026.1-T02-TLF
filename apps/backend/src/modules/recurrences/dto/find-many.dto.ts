import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { SyncFindManyBaseDto } from '@common/sync/dto/sync-find-many-base.dto'

export class FindManyRecurrencesDto extends SyncFindManyBaseDto {
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
  @IsBoolean()
  isActive?: boolean
}
