import type { CategoryData, SummaryData, TransactionListItem } from '../../../../types/types'
import type { TransactionType } from '@/services/database/queries/transaction'

export const recordsSummary: SummaryData = {
  balance: 3570.75,
  income: 8250.25,
  expense: 4679.5,
}

export const categoryDistribution: CategoryData[] = [
  { name: 'Moradia', amount: 1850.0, color: '#6A66FF' },
  { name: 'Alimentacao', amount: 1240.35, color: '#2CB67D' },
  { name: 'Transporte', amount: 890.25, color: '#F25F5C' },
  { name: 'Saude', amount: 450.0, color: '#3A86FF' },
  { name: 'Assinaturas', amount: 248.9, color: '#FFB703' },
]

export const transactionCategoryOptions = categoryDistribution.map((category) => category.name)

export const transactionTypeOptions: TransactionType[] = ['EXPENSE', 'INCOME', 'TRANSFER']

export const mockTransactions: TransactionListItem[] = [
  {
    id: 'mock-1',
    description: 'Salario abril',
    category: 'Salario',
    type: 'INCOME',
    date: new Date('2026-04-30'),
    amount: 5500,
  },
  {
    id: 'mock-2',
    description: 'Aluguel',
    category: 'Moradia',
    type: 'EXPENSE',
    date: new Date('2026-05-01'),
    amount: 1800,
  },
  {
    id: 'mock-3',
    description: 'Supermercado',
    category: 'Alimentacao',
    type: 'EXPENSE',
    date: new Date('2026-05-02'),
    amount: 320.45,
  },
  {
    id: 'mock-4',
    description: 'Uber',
    category: 'Transporte',
    type: 'EXPENSE',
    date: new Date('2026-04-29'),
    amount: 58.9,
  },
  {
    id: 'mock-5',
    description: 'Academia',
    category: 'Saude',
    type: 'EXPENSE',
    date: new Date('2026-04-27'),
    amount: 120,
  },
  {
    id: 'mock-6',
    description: 'Netflix',
    category: 'Assinaturas',
    type: 'EXPENSE',
    date: new Date('2026-04-25'),
    amount: 55.9,
  },
  {
    id: 'mock-7',
    description: 'Freelance app',
    category: 'Freelance',
    type: 'INCOME',
    date: new Date('2026-04-20'),
    amount: 800,
  },
  {
    id: 'mock-8',
    description: 'Transferencia poupanca',
    category: 'Transferencia',
    type: 'TRANSFER',
    date: new Date('2026-04-21'),
    amount: 300,
  },
]
