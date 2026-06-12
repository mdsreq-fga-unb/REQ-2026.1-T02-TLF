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

export const ACCOUNTS: FormAccount[] = [
  { id: 'cash', label: 'Dinheiro', icon: 'banknote' },
  { id: 'checking', label: 'Conta Corrente', icon: 'landmark' },
  { id: 'credit', label: 'Cartão de Crédito', icon: 'credit-card' },
]

export const CATEGORIES: Record<TransactionType, FormCategory[]> = {
  EXPENSE: [
    {
      id: 'food',
      label: 'Alimentação',
      icon: 'utensils',
      subcategories: [
        { id: 'restaurant', label: 'Restaurante', icon: 'utensils' },
        { id: 'market', label: 'Mercado', icon: 'shopping-cart' },
        { id: 'delivery', label: 'Delivery', icon: 'utensils-crossed' },
      ],
    },
    {
      id: 'transport',
      label: 'Transporte',
      icon: 'bus',
      subcategories: [
        { id: 'taxi', label: 'Táxi', icon: 'car' },
        { id: 'ride', label: 'App', icon: 'car' },
        { id: 'flight', label: 'Avião', icon: 'plane' },
      ],
    },
    {
      id: 'home',
      label: 'Moradia',
      icon: 'house',
      subcategories: [
        { id: 'rent', label: 'Aluguel', icon: 'house' },
        { id: 'utilities', label: 'Contas', icon: 'zap' },
      ],
    },
    {
      id: 'health',
      label: 'Saúde',
      icon: 'hospital',
      subcategories: [
        { id: 'pharmacy', label: 'Farmácia', icon: 'pill' },
        { id: 'doctor', label: 'Médico', icon: 'hospital' },
      ],
    },
    {
      id: 'leisure',
      label: 'Lazer',
      icon: 'clapperboard',
      subcategories: [
        { id: 'games', label: 'Jogos', icon: 'gamepad' },
        { id: 'movies', label: 'Cinema', icon: 'clapperboard' },
      ],
    },
  ],
  INCOME: [
    {
      id: 'salary',
      label: 'Salário',
      icon: 'dollar-sign',
      subcategories: [
        { id: 'monthly', label: 'Mensal', icon: 'refresh-cw' },
        { id: 'bonus', label: 'Bônus', icon: 'gift' },
      ],
    },
    {
      id: 'freelance',
      label: 'Freelance',
      icon: 'briefcase',
      subcategories: [{ id: 'project', label: 'Projeto', icon: 'folder' }],
    },
    {
      id: 'investment',
      label: 'Investimento',
      icon: 'trending-up',
      subcategories: [
        { id: 'dividends', label: 'Dividendos', icon: 'chart-line' },
        { id: 'interest', label: 'Juros', icon: 'trending-up' },
      ],
    },
    {
      id: 'other',
      label: 'Outros',
      icon: 'ellipsis',
      subcategories: [],
    },
  ],
  TRANSFER: [
    {
      id: 'transfer',
      label: 'Transferência',
      icon: 'arrow-left-right',
      subcategories: [],
    },
  ],
}
