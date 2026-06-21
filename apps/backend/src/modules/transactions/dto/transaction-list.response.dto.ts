import { ApiProperty } from '@nestjs/swagger'

export class TransactionListResponseDto {
  @ApiProperty({
    example: [
      {
        id: 'ae73db85-6c25-4b8d-91b2-d0cda2830c65',
        type: 'EXPENSE',
        amount: 5000,
        description: 'Almoço',
        date: '2026-05-02T00:00:00.000Z',
        status: 'COMPLETED',
        category: {
          id: '3cec466a-096d-4016-bb10-bcc9b94a7d36',
          name: 'Alimentação',
        },
        subCategory: {
          id: 'a55d44df-6f3b-480d-9db4-388235e931bc',
          name: 'Restaurante',
        },
        account: {
          id: '077e482b-dfd9-48cb-9b79-15a3c25a83a5',
          name: 'Nubank',
        },
      },
    ],
    description: 'Lista de transações',
  })
  data!: {
    id: string
    type: string
    amount: number
    description?: string
    date: string
    status?: string
    category?: {
      id: string
      name: string
    }
    subCategory?: {
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
      total: 100,
      page: 1,
      limit: 20,
      totalPages: 5,
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
