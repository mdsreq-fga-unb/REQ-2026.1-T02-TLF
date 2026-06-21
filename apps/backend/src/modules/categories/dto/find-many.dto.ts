import { IsOptional, IsString, IsUUID } from 'class-validator'
import { SyncFindManyBaseDto } from '@common/sync/dto/sync-find-many-base.dto'

export class FindManyCategoriesDto extends SyncFindManyBaseDto {
  @IsOptional()
  @IsUUID()
  id?: string

  @IsOptional()
  @IsString()
  name?: string
}
