import { ApiProperty } from '@nestjs/swagger'

export class RecurrenceConfirmResponseDto {
  @ApiProperty({
    example: 'b1d2c3a4-5678-90ab-cdef-1234567890ab',
    description: 'ID da transação criada ou concluída',
  })
  id!: string

  @ApiProperty({ example: 'ae73db85-6c25-4b8d-91b2-d0cda2830c65' })
  recurrenceId!: string

  @ApiProperty({ example: 'COMPLETED' })
  status!: string

  @ApiProperty({ example: 2990, description: 'Valor em centavos' })
  amount!: number

  @ApiProperty({ example: '2026-06-10T00:00:00.000Z' })
  date!: string

  @ApiProperty({
    example: true,
    description:
      'true quando uma nova transação foi criada; false quando uma pendente foi concluída',
  })
  created!: boolean
}
