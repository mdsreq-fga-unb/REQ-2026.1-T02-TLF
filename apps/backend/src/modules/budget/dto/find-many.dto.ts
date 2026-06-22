import { IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator'
import { SyncFindManyBaseDto } from '@common/sync/dto/sync-find-many-base.dto'

export class FindManyBudgetsDto extends SyncFindManyBaseDto {
  @IsOptional()
  @IsUUID()
  id?: string

  @IsOptional()
  @IsUUID()
  categoryId?: string

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  month?: number

  @IsOptional()
  @IsInt()
  @Min(2000)
  year?: number
}
