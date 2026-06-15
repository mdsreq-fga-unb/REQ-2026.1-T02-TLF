import { IsBoolean, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator'
import { NotificationType } from 'generated/prisma/client'
import { SyncFindManyBaseDto } from '@common/sync/dto/sync-find-many-base.dto'

export class FindManyNotificationsDto extends SyncFindManyBaseDto {
  @IsOptional()
  @IsUUID()
  id?: string

  @IsOptional()
  @IsEnum(NotificationType)
  type?: NotificationType

  @IsOptional()
  @IsBoolean()
  isRead?: boolean

  @IsOptional()
  @IsString()
  referenceType?: string
}
