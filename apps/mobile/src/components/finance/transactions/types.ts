import type { TransactionType } from '@/services/database/queries/transaction'
import { BudgetType } from 'types/types'

export type { TransactionType }

export type FormAccount = {
  id: string
  label: string
  icon: string
}

export type FormCategory = {
  id: string
  label: string
  icon: string
  subcategories: FormSubcategory[]
}

export type FormSubcategory = {
  id: string
  label: string
  icon: string
}

// Tab underline e botão Salvar do keypad
export const TYPE_COLORS: Record<TransactionType, string> = {
  EXPENSE: '#FF4B4B',
  INCOME: '#00E383',
  TRANSFER: '#8083FF',
}

// Cor do valor monetário — Transfer é neutro (on-surface)
export const AMOUNT_COLORS: Record<TransactionType | BudgetType, string> = {
  EXPENSE: '#FF4B4B',
  INCOME: '#00E383',
  TRANSFER: '#e4e1ed',
  BUDGET: '#e4e1ed',
  GOAL: '#00E383',
}

// Chips de subcategoria sempre usam secondary-fixed-dim
export const CHIP_ACCENT = '#00e383'

export const ACCOUNTS: FormAccount[] = [
  { id: 'cash', label: 'Dinheiro', icon: 'payments' },
  { id: 'checking', label: 'Conta Corrente', icon: 'account-balance' },
  { id: 'credit', label: 'Cartão de Crédito', icon: 'credit-card' },
]

export const CATEGORIES: Record<TransactionType, FormCategory[]> = {
  EXPENSE: [
    {
      id: 'food',
      label: 'Alimentação',
      icon: 'restaurant',
      subcategories: [
        { id: 'restaurant', label: 'Restaurante', icon: 'restaurant' },
        { id: 'market', label: 'Mercado', icon: 'shopping-cart' },
        { id: 'delivery', label: 'Delivery', icon: 'fastfood' },
      ],
    },
    {
      id: 'transport',
      label: 'Transporte',
      icon: 'directions-bus',
      subcategories: [
        { id: 'taxi', label: 'Táxi', icon: 'local-taxi' },
        { id: 'ride', label: 'App', icon: 'directions-car' },
        { id: 'flight', label: 'Avião', icon: 'flight' },
      ],
    },
    {
      id: 'home',
      label: 'Moradia',
      icon: 'home',
      subcategories: [
        { id: 'rent', label: 'Aluguel', icon: 'home' },
        { id: 'utilities', label: 'Contas', icon: 'power' },
      ],
    },
    {
      id: 'health',
      label: 'Saúde',
      icon: 'local-hospital',
      subcategories: [
        { id: 'pharmacy', label: 'Farmácia', icon: 'healing' },
        { id: 'doctor', label: 'Médico', icon: 'local-hospital' },
      ],
    },
    {
      id: 'leisure',
      label: 'Lazer',
      icon: 'movie',
      subcategories: [
        { id: 'games', label: 'Jogos', icon: 'games' },
        { id: 'movies', label: 'Cinema', icon: 'movie' },
      ],
    },
  ],
  INCOME: [
    {
      id: 'salary',
      label: 'Salário',
      icon: 'attach-money',
      subcategories: [
        { id: 'monthly', label: 'Mensal', icon: 'autorenew' },
        { id: 'bonus', label: 'Bônus', icon: 'card-giftcard' },
      ],
    },
    {
      id: 'freelance',
      label: 'Freelance',
      icon: 'work',
      subcategories: [{ id: 'project', label: 'Projeto', icon: 'folder' }],
    },
    {
      id: 'investment',
      label: 'Investimento',
      icon: 'trending-up',
      subcategories: [
        { id: 'dividends', label: 'Dividendos', icon: 'show-chart' },
        { id: 'interest', label: 'Juros', icon: 'trending-up' },
      ],
    },
    {
      id: 'other',
      label: 'Outros',
      icon: 'more-horiz',
      subcategories: [],
    },
  ],
  TRANSFER: [
    {
      id: 'transfer',
      label: 'Transferência',
      icon: 'swap-horiz',
      subcategories: [],
    },
  ],
}
