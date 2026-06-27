import { ApiProperty } from '@nestjs/swagger'

export class RecurrenceUnconfirmResponseDto {
  @ApiProperty({ example: 'ae73db85-6c25-4b8d-91b2-d0cda2830c65' })
  recurrenceId!: string

  @ApiProperty({
    example: true,
    description: 'true quando havia uma transação do mês e ela foi removida',
  })
  removed!: boolean

  @ApiProperty({ example: 1, description: 'Quantidade de transações removidas' })
  count!: number
}
