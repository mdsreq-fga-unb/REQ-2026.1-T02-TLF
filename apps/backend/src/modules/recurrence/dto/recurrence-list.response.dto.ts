import { ApiProperty } from '@nestjs/swagger'

export class RecurrenceListResponseDto {
  @ApiProperty({
    example: [
      {
        id: 'ae73db85-6c25-4b8d-91b2-d0cda2830c65',
        description: 'Assinatura Netflix',
        amount: 2990,
        chargeDate: 10,
        startDate: '2026-01-01T00:00:00.000Z',
        endDate: null,
        isActive: true,
        category: {
          id: '3cec466a-096d-4016-bb10-bcc9b94a7d36',
          name: 'Assinaturas',
        },
        account: {
          id: '077e482b-dfd9-48cb-9b79-15a3c25a83a5',
          name: 'Nubank',
        },
      },
    ],
    description: 'Lista de recorrências',
  })
  data!: {
    id: string
    description: string
    amount: number
    chargeDate: number
    startDate: string
    endDate?: string
    isActive: boolean
    category?: {
      id: string
      name: string
    }
    account: {
      id: string
      name: string
    }
  }[]

  @ApiProperty({
    example: {
      total: 50,
      page: 1,
      limit: 20,
      totalPages: 3,
    },
    description: 'Metadados de paginação',
  })
  meta!: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
