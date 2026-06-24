import type { Recurrence } from '@/components/finance/recurrences/types'
import type { IconKey } from '@/utils/icons'

export type PaymentHistoryEntry = {
  month: number
  year: number
  status: 'CONFIRMED' | 'SKIPPED' | 'PENDING'
  date?: string
  amount?: number
}

export type MockAccount = {
  id: string
  name: string
  type: 'CHECKING' | 'SAVINGS' | 'CREDIT_CARD' | 'CASH'
}

export type MockCategory = {
  id: string
  name: string
  icon: IconKey
}

export type MockSubcategory = {
  id: string
  categoryId: string
  name: string
}

export const mockAccounts: MockAccount[] = [
  { id: 'acc-nubank', name: 'Nubank', type: 'CHECKING' },
  { id: 'acc-itau', name: 'Itaú', type: 'CHECKING' },
  { id: 'acc-principal', name: 'Principal', type: 'CHECKING' },
  { id: 'acc-carteira', name: 'Carteira', type: 'CASH' },
  { id: 'acc-dinheiro', name: 'Dinheiro', type: 'CASH' },
  { id: 'acc-xp', name: 'Investimentos XP', type: 'SAVINGS' },
]

export const mockCategories: MockCategory[] = [
  { id: 'cat-moradia', name: 'Moradia', icon: 'house' },
  { id: 'cat-assinaturas', name: 'Assinaturas', icon: 'repeat' },
  { id: 'cat-alimentacao', name: 'Alimentação', icon: 'utensils' },
  { id: 'cat-transporte', name: 'Transporte', icon: 'car' },
  { id: 'cat-saude', name: 'Saúde', icon: 'dumbbell' },
  { id: 'cat-educacao', name: 'Educação', icon: 'graduation-cap' },
  { id: 'cat-lazer', name: 'Lazer', icon: 'clapperboard' },
  { id: 'cat-outros', name: 'Outros', icon: 'tag' },
]

export const mockSubcategories: MockSubcategory[] = [
  { id: 'sub-aluguel', categoryId: 'cat-moradia', name: 'Aluguel' },
  { id: 'sub-condominio', categoryId: 'cat-moradia', name: 'Condomínio' },
  { id: 'sub-luz', categoryId: 'cat-moradia', name: 'Luz' },
  { id: 'sub-agua', categoryId: 'cat-moradia', name: 'Água' },
  { id: 'sub-internet', categoryId: 'cat-moradia', name: 'Internet' },
  { id: 'sub-streaming', categoryId: 'cat-assinaturas', name: 'Streaming' },
  { id: 'sub-musica', categoryId: 'cat-assinaturas', name: 'Música' },
  { id: 'sub-software', categoryId: 'cat-assinaturas', name: 'Software' },
  { id: 'sub-jogos', categoryId: 'cat-assinaturas', name: 'Jogos' },
  { id: 'sub-restaurante', categoryId: 'cat-alimentacao', name: 'Restaurante' },
  { id: 'sub-mercado', categoryId: 'cat-alimentacao', name: 'Mercado' },
  { id: 'sub-delivery', categoryId: 'cat-alimentacao', name: 'Delivery' },
  { id: 'sub-combustivel', categoryId: 'cat-transporte', name: 'Combustível' },
  { id: 'sub-app-transporte', categoryId: 'cat-transporte', name: 'Transporte por app' },
  { id: 'sub-onibus', categoryId: 'cat-transporte', name: 'Ônibus/Metrô' },
  { id: 'sub-seguro-auto', categoryId: 'cat-transporte', name: 'Seguro auto' },
  { id: 'sub-plano-saude', categoryId: 'cat-saude', name: 'Plano de saúde' },
  { id: 'sub-academia', categoryId: 'cat-saude', name: 'Academia' },
  { id: 'sub-farmacia', categoryId: 'cat-saude', name: 'Farmácia' },
  { id: 'sub-consulta', categoryId: 'cat-saude', name: 'Consulta médica' },
  { id: 'sub-mensalidade', categoryId: 'cat-educacao', name: 'Mensalidade' },
  { id: 'sub-curso', categoryId: 'cat-educacao', name: 'Curso' },
  { id: 'sub-livros', categoryId: 'cat-educacao', name: 'Livros' },
  { id: 'sub-cinema', categoryId: 'cat-lazer', name: 'Cinema' },
  { id: 'sub-viagem', categoryId: 'cat-lazer', name: 'Viagem' },
  { id: 'sub-esporte', categoryId: 'cat-lazer', name: 'Esporte' },
  { id: 'sub-outros', categoryId: 'cat-outros', name: 'Outros' },
]

export const mockRecurrences: Recurrence[] = [
  {
    id: '1',
    description: 'Aluguel',
    amount: 2500.0,
    type: 'EXPENSE',
    frequency: 'MONTHLY',
    dueDay: 5,
    institutionId: 'inst-itau',
    categoryId: 'cat-moradia',
    subcategoryId: 'sub-aluguel',
    startDate: '2025-01-05',
    duration: 'INDEFINITE',
    isActive: true,
  },
  {
    id: '2',
    description: 'Netflix',
    amount: 55.9,
    type: 'EXPENSE',
    frequency: 'MONTHLY',
    dueDay: 18,
    institutionId: 'inst-nubank',
    categoryId: 'cat-assinaturas',
    subcategoryId: 'sub-streaming',
    startDate: '2024-06-18',
    duration: 'INDEFINITE',
    isActive: true,
  },
  {
    id: '3',
    description: 'Academia',
    amount: 120.0,
    type: 'EXPENSE',
    frequency: 'MONTHLY',
    dueDay: 10,
    institutionId: 'inst-nubank',
    categoryId: 'cat-saude',
    subcategoryId: 'sub-academia',
    startDate: '2025-03-10',
    duration: 'INDEFINITE',
    isActive: true,
  },
]

export const mockPaymentHistory: Record<string, PaymentHistoryEntry[]> = {
  '1': [
    { month: 5, year: 2026, status: 'PENDING' },
    { month: 4, year: 2026, status: 'CONFIRMED', date: '05/04', amount: 2500 },
    { month: 3, year: 2026, status: 'CONFIRMED', date: '05/03', amount: 2500 },
    { month: 2, year: 2026, status: 'CONFIRMED', date: '05/02', amount: 2500 },
    { month: 1, year: 2026, status: 'SKIPPED', date: '03/01' },
  ],
  '2': [
    { month: 5, year: 2026, status: 'PENDING' },
    { month: 4, year: 2026, status: 'CONFIRMED', date: '18/04', amount: 55.9 },
    { month: 3, year: 2026, status: 'CONFIRMED', date: '18/03', amount: 55.9 },
    { month: 2, year: 2026, status: 'SKIPPED', date: '14/02' },
    { month: 1, year: 2026, status: 'CONFIRMED', date: '18/01', amount: 55.9 },
  ],
  '3': [
    { month: 5, year: 2026, status: 'PENDING' },
    { month: 4, year: 2026, status: 'CONFIRMED', date: '10/04', amount: 120 },
    { month: 3, year: 2026, status: 'SKIPPED', date: '08/03' },
    { month: 2, year: 2026, status: 'CONFIRMED', date: '10/02', amount: 120 },
    { month: 1, year: 2026, status: 'CONFIRMED', date: '10/01', amount: 120 },
  ],
}

export const categoryIcons: Record<string, IconKey> = {
  'cat-moradia': 'house',
  'cat-assinaturas': 'repeat',
  'cat-alimentacao': 'utensils',
  'cat-transporte': 'car',
  'cat-saude': 'dumbbell',
  'cat-educacao': 'graduation-cap',
  'cat-lazer': 'clapperboard',
  'cat-outros': 'tag',
}

export const categoryColors: Record<string, string> = {
  'cat-moradia': '#A0522D',
  'cat-assinaturas': '#5B4FCF',
  'cat-alimentacao': '#B8860B',
  'cat-transporte': '#8B3A3A',
  'cat-saude': '#2E7D5E',
  'cat-educacao': '#8B6914',
  'cat-lazer': '#6B4C9A',
  'cat-outros': '#4A5060',
}
