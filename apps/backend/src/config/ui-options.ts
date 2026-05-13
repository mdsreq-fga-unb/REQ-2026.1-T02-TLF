export const CATEGORY_ICONS = [
  'utensils', // food / restaurant (fork + knife)
  'briefcase', // work
  'bike', // scooter / urban mobility
  'shopping-bag', // shopping
  'car', // car / transport
  'bus', // public transport
  'heart-pulse', // health
  'smile', // leisure / entertainment
  'dollar-sign', // finance / money
  'landmark', // bank / institution
  'calendar', // subscriptions / scheduled
  'receipt', // bills / expenses
] as const

export const CATEGORY_COLORS = [
  '#6B6BF5', // indigo / blue-purple
  '#3DDBA8', // mint green
  '#F5916B', // salmon / orange
  '#F542C8', // hot pink (selected in print)
  '#E04444', // red
  '#FFFFFF', // white
  '#A355E8', // purple
  '#42C8F5', // sky blue / cyan
  '#E83F8A', // deep pink
  '#4A5CF5', // royal blue
  '#A8E83F', // lime green
  '#F5C842', // yellow / gold
] as const

export type CategoryIcon = (typeof CATEGORY_ICONS)[number]
export type CategoryColor = (typeof CATEGORY_COLORS)[number]

export function isValidIcon(value: string): boolean {
  return (CATEGORY_ICONS as readonly string[]).includes(value)
}

export function isValidColor(value: string): boolean {
  return (CATEGORY_COLORS as readonly string[]).includes(value)
}

export const DEFAULT_CATEGORIES: Array<{
  name: string
  icon: CategoryIcon
  color: CategoryColor
}> = [
  { name: 'Alimentação', icon: 'utensils', color: '#F5916B' },
  { name: 'Transporte', icon: 'car', color: '#6B6BF5' },
  { name: 'Saúde', icon: 'heart-pulse', color: '#E04444' },
  { name: 'Lazer', icon: 'smile', color: '#3DDBA8' },
  { name: 'Compras', icon: 'shopping-bag', color: '#F542C8' },
  { name: 'Moradia', icon: 'landmark', color: '#A355E8' },
  { name: 'Assinaturas', icon: 'calendar', color: '#42C8F5' },
  { name: 'Trabalho', icon: 'briefcase', color: '#F5C842' },
  { name: 'Transporte público', icon: 'bus', color: '#A8E83F' },
  { name: 'Finanças', icon: 'dollar-sign', color: '#4A5CF5' },
  { name: 'Outros', icon: 'receipt', color: '#FFFFFF' },
]
