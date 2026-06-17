import { ApiProperty } from '@nestjs/swagger'

export class RecurrenceDetailResponseDto {
  @ApiProperty({
    example: 'ae73db85-6c25-4b8d-91b2-d0cda2830c65',
  })
  id!: string

  @ApiProperty({ example: 'Assinatura Netflix' })
  description!: string

  @ApiProperty({ example: 2990 })
  amount!: number

  @ApiProperty({ example: 10 })
  chargeDate!: number

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  startDate!: string

  @ApiProperty({ example: '2026-12-31T00:00:00.000Z', required: false })
  endDate?: string

  @ApiProperty({ example: true })
  isActive!: boolean

  @ApiProperty({
    example: {
      id: '3cec466a-096d-4016-bb10-bcc9b94a7d36',
      name: 'Assinaturas',
    },
  })
  category!: {
    id: string
    name: string
  }

  @ApiProperty({
    example: {
      id: 'a55d44df-6f3b-480d-9db4-388235e931bc',
      name: 'Streaming',
    },
    required: false,
  })
  subCategory?: {
    id: string
    name: string
  }

  @ApiProperty({
    example: {
      id: '077e482b-dfd9-48cb-9b79-15a3c25a83a5',
      name: 'Nubank',
    },
  })
  account!: {
    id: string
    name: string
  }
}
