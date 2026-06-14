import { IsDateString, IsOptional, IsUUID } from 'class-validator'

export class SyncRecordDto {
  @IsUUID()
  id!: string

  @IsOptional()
  @IsDateString()
  createdAt?: string

  @IsOptional()
  @IsDateString()
  updatedAt?: string
}
