import { IsDateString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator'
import { PullChanges } from '../../../types/tables'

export class PullRequestDto {
  @IsUUID()
  @IsNotEmpty()
  userId!: string

  @IsOptional()
  @IsDateString()
  lastUpdatedAt?: string | null
}

export class PullQueryDto {
  @IsOptional()
  @IsDateString()
  lastUpdatedAt?: string | null
}

export class PullResponseDto {
  changes?: PullChanges
  timestamp!: Date
}
