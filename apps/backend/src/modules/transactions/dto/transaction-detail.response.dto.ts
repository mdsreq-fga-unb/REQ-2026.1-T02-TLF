import { ApiProperty } from "@nestjs/swagger"

export class TransactionDetailResponseDto {

  @ApiProperty({
    example: "ae73db85-6c25-4b8d-91b2-d0cda2830c65"
  })
  id!: string

  @ApiProperty({ example: "EXPENSE" })
  type!: string

  @ApiProperty({ example: 5000 })
  amount!: number

  @ApiProperty({ example: "Almoço", required: false })
  description?: string

  @ApiProperty({ example: "2026-05-02T00:00:00.000Z" })
  date!: string

  @ApiProperty({ example: "COMPLETED", required: false })
  status?: string

  @ApiProperty({
    example: {
      id: "3cec466a-096d-4016-bb10-bcc9b94a7d36",
      name: "Alimentação"
    }
  })
  category!: {
    id: string
    name: string
  }

  @ApiProperty({
    example: {
      id: "a55d44df-6f3b-480d-9db4-388235e931bc",
      name: "Restaurante"
    },
    required: false
  })
  subCategory?: {
    id: string
    name: string
  }

  @ApiProperty({
    example: {
      id: "077e482b-dfd9-48cb-9b79-15a3c25a83a5",
      name: "Nubank"
    }
  })
  account!: {
    id: string
    name: string
  }
}