import type { TransactionType } from '@/services/database/queries/transaction'
import type { IconKey } from '@/utils/icons'

export type { TransactionType }

export type FormAccount = {
  id: string
  label: string
  icon: IconKey
}

export type FormCategory = {
  id: string
  label: string
  icon: IconKey
  subcategories: FormSubcategory[]
}

export type FormSubcategory = {
  id: string
  label: string
  icon: IconKey
}

// These IDs are real values from the PostgreSQL database used by the backend.
// The mobile form still uses static options, but the payload must use actual DB row IDs.
export const ACCOUNTS: FormAccount[] = [
  { id: '22222222-2222-4222-a222-222222222222', label: 'Conta Principal', icon: 'banknote' },
  { id: '55555555-5555-5555-a555-555555555555', label: 'Conta Corrente BB', icon: 'landmark' },
]

export const CATEGORIES: Record<TransactionType, FormCategory[]> = {
  EXPENSE: [
    {
      id: '08dd7354-eca4-45fb-9037-44a91dd12e9a',
      label: 'Alimentação',
      icon: 'utensils',
      subcategories: [],
    },
    {
      id: 'b74af847-248a-4dc1-9e90-f35fffb377cc',
      label: 'Transporte',
      icon: 'bus',
      subcategories: [],
    },
    {
      id: '8b23d0c1-37a0-439e-80dd-b77dbf6c2bce',
      label: 'Saúde',
      icon: 'hospital',
      subcategories: [],
    },
    {
      id: 'dbf303af-810f-47ce-86bd-1dc59def979e',
      label: 'Lazer',
      icon: 'clapperboard',
      subcategories: [],
    },
    {
      id: '198e2f6d-2e82-4309-bc93-0f5de7da6fdf',
      label: 'Compras',
      icon: 'shopping-bag',
      subcategories: [],
    },
    {
      id: '25d9b4af-cd89-4829-a8b1-abeaf3a821e4',
      label: 'Moradia',
      icon: 'house',
      subcategories: [],
    },
    {
      id: '9974bc5f-198f-476f-8bfa-7936a9e8bbc9',
      label: 'Assinaturas',
      icon: 'calendar',
      subcategories: [],
    },
    {
      id: '0b7c17f8-a0f1-4a6e-965d-93f99ebe3382',
      label: 'Trabalho',
      icon: 'briefcase',
      subcategories: [],
    },
    {
      id: '64d6095e-8405-4b53-ac64-7168359f8141',
      label: 'Transporte público',
      icon: 'bus',
      subcategories: [],
    },
    {
      id: 'e1d3b547-aa8b-4370-9fe6-aa2aabf756e3',
      label: 'Finanças',
      icon: 'dollar-sign',
      subcategories: [],
    },
    {
      id: '7d3d677a-9724-4789-a2a0-8824d174e7a1',
      label: 'Outros',
      icon: 'ellipsis',
      subcategories: [],
    },
  ],
  INCOME: [
    {
      id: '7d3d677a-9724-4789-a2a0-8824d174e7a1',
      label: 'Salário',
      icon: 'dollar-sign',
      subcategories: [],
    },
    {
      id: '0b7c17f8-a0f1-4a6e-965d-93f99ebe3382',
      label: 'Freelance',
      icon: 'briefcase',
      subcategories: [],
    },
    {
      id: 'e1d3b547-aa8b-4370-9fe6-aa2aabf756e3',
      label: 'Investimento',
      icon: 'trending-up',
      subcategories: [],
    },
    {
      id: '7d3d677a-9724-4789-a2a0-8824d174e7a1',
      label: 'Outros',
      icon: 'ellipsis',
      subcategories: [],
    },
  ],
  TRANSFER: [
    {
      id: '25d9b4af-cd89-4829-a8b1-abeaf3a821e4',
      label: 'Transferência',
      icon: 'arrow-left-right',
      subcategories: [],
    },
  ],
}
