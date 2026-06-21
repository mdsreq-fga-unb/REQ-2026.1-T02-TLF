import { IsOptional, IsUUID } from 'class-validator'
import { SyncFindManyBaseDto } from '@common/sync/dto/sync-find-many-base.dto'

export class FindManySubCategoriesDto extends SyncFindManyBaseDto {
  @IsOptional()
  @IsUUID()
  id?: string

  @IsOptional()
  @IsUUID()
  categoryId?: string
}
