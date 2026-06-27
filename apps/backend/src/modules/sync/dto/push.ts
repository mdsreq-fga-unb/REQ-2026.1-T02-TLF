import { Type } from 'class-transformer'
import { IsDateString, IsNotEmpty, IsObject, IsUUID, ValidateNested } from 'class-validator'
import { PushChanges } from '../../../types/tables'

export class PushQueryDto {
  @IsDateString()
  lastUpdatedAt!: string
}

export class PushBodyDto {
  @IsObject()
  changes!: PushChanges
}

export class PushRequestDto {
  @IsUUID()
  @IsNotEmpty()
  userId!: string

  @IsDateString()
  lastUpdatedAt!: string

  @IsObject()
  @ValidateNested()
  @Type(() => Object)
  changes!: PushChanges
}
export class PushResponseDto {
  success!: boolean
}
