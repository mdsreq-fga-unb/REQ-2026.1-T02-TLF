import { TransactionType } from '@/services/database/models/transaction'

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)

const toDate = (value: Date | number | string) => {
  return value instanceof Date ? value : new Date(value)
}

export const formatDate = (value: Date | number | string) => {
  const date = toDate(value)

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

export const formatDateHeading = (value: Date | number | string) => {
  const date = toDate(value)

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export const formatDateShort = (value: Date | number | string) => {
  const date = toDate(value)

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export const formatDateTimeShort = (value: Date | number | string) => {
  const date = toDate(value)

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export const formatTransactionType = (type: TransactionType) => {
  switch (type) {
    case 'INCOME':
      return 'Receita'
    case 'EXPENSE':
      return 'Despesa'
    case 'TRANSFER':
      return 'Transferencia'
    default:
      return 'Outro'
  }
}
