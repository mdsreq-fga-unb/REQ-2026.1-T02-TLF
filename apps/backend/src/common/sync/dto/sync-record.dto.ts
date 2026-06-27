import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class SyncRecordDto {
  @IsString()
  @IsNotEmpty()
  id!: string

  @IsOptional()
  @IsDateString()
  createdAt?: string

  @IsOptional()
  @IsDateString()
  updatedAt?: string
}
