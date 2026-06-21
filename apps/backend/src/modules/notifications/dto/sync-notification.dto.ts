import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { NotificationType } from 'generated/prisma/client'
import { SyncRecordDto } from '@common/sync/dto/sync-record.dto'

export class SyncNotificationDto extends SyncRecordDto {
  @IsEnum(NotificationType)
  type!: NotificationType

  @IsString()
  @IsNotEmpty()
  title!: string

  @IsString()
  @IsNotEmpty()
  description!: string

  @IsOptional()
  @IsBoolean()
  isRead?: boolean

  @IsOptional()
  @IsString()
  primaryActionLabel?: string | null

  @IsOptional()
  @IsString()
  primaryAction?: string | null

  @IsOptional()
  @IsString()
  secondaryActionLabel?: string | null

  @IsOptional()
  @IsString()
  secondaryAction?: string | null

  @IsString()
  @IsNotEmpty()
  icon!: string

  @IsString()
  @IsNotEmpty()
  color!: string

  @IsString()
  @IsNotEmpty()
  referenceId!: string

  @IsString()
  @IsNotEmpty()
  referenceType!: string
}
