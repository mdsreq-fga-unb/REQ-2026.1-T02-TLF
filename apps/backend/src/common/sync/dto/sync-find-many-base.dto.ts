import { Type } from 'class-transformer'
import { IsDate, IsNotEmpty, IsOptional, IsUUID } from 'class-validator'

export class SyncFindManyBaseDto {
  @IsUUID()
  @IsNotEmpty()
  userId!: string

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createdAfter?: Date

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  updatedAfter?: Date
}
