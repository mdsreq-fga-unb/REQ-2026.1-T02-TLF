import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator'

export class CreateBudgetDto {
  // TODO: retirar opcionalidade quando a logica de categorias for implementada
  @ApiProperty({ example: 'uuid-da-categoria'})

  @ApiProperty({ example: 'uuid-da-categoria', required: false })
  @IsString()
  // TODO: retirar opcionalidade quando a logica de categorias for implementada
  @IsNotEmpty()
  categoryId!: string


  @ApiProperty({ example: 'Orçamento Alimentação' })
  @IsString()
  @IsNotEmpty()
  name!: string

  @ApiProperty({ example: 50000, description: 'Limite em centavos' })
  @IsInt()
  @Min(1)
  amountLimit!: number

  @ApiProperty({ example: 5, description: 'Mês (1-12)' })
  @IsInt()
  @Min(1)
  @Max(12)
  month!: number

  @ApiProperty({ example: 2026 })
  @IsInt()
  @Min(2000)
  year!: number
}