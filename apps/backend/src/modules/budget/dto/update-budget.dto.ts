import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator'

export class UpdateBudgetDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({ required: false, description: 'Limite em centavos' })
  @IsOptional()
  @IsInt()
  @Min(1)
  amountLimit?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  month?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(2000)
  year?: number

  @ApiProperty({ required: false, example: 'uuid-da-categoria' })
  @IsOptional()
  @IsString()
  categoryId?: string
}