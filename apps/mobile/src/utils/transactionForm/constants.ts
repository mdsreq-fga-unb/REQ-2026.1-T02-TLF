import { TransactionType } from '@/services/database/models/transaction'

export const MAX_AMOUNT_CENTS = 9_999_999

export const VALID_TRANSACTION_TYPES = new Set<TransactionType>(['EXPENSE', 'INCOME', 'TRANSFER'])

export const TYPE_LABELS: Record<TransactionType, string> = {
  EXPENSE: 'Despesa',
  INCOME: 'Receita',
  TRANSFER: 'Transferência',
}

export const TYPE_SIGN: Record<TransactionType, string> = {
  EXPENSE: '−',
  INCOME: '+',
  TRANSFER: '',
}

export const TYPE_TABS: { value: TransactionType; label: string }[] = [
  { value: 'EXPENSE', label: TYPE_LABELS.EXPENSE },
  { value: 'INCOME', label: TYPE_LABELS.INCOME },
  { value: 'TRANSFER', label: TYPE_LABELS.TRANSFER },
]

export const TRANSACTION_FORM_ERRORS = {
  amount: 'Informe o valor da transação',
  category: 'Selecione uma categoria',
  destinationInstitution: 'Selecione uma instituição de destino diferente da origem',
  submit: 'Não foi possível salvar a transação. Tente novamente.',
} as const

export const TRANSACTION_FORM_COPY = {
  createTitle: 'Adicionar Registro',
  editTitle: 'Editar Registro',
  createSubmit: 'Adicionar Registro',
  editSubmit: 'Salvar alterações',
  submitting: 'Salvando...',
  successTitle: 'Registro salvo!',
  successMessage: 'Sua transação foi registrada com sucesso.',
  editSuccessTitle: 'Registro atualizado!',
  editSuccessMessage: 'Suas alterações foram salvas com sucesso.',
  notesPlaceholder: 'Adicionar nota...',
  recorrenciasTab: 'Recorrências',
} as const
