import type { IconKey } from '@/utils/icons'

/**
 * Catálogo de aparência de instituições financeiras.
 *
 * Fonte das cores e ícones disponíveis no seletor "Selecionar Ícone e Cor".
 * As cores seguem a paleta de destaque do design (hex puros, fora do tema
 * semântico, pois são escolhas livres do usuário).
 */

export type AppearanceColor = string

export const appearanceColors: AppearanceColor[] = [
  '#6E72FF', // Azul
  '#27FF97', // Verde
  '#FF9F6E', // Laranja
  '#FF6EC7', // Rosa
  '#FF5252', // Vermelho
  '#000000', // Preto
  '#A370FF', // Roxo
  '#26D0CE', // Ciano
]

export const appearanceIcons: IconKey[] = [
  'utensils',
  'shopping-bag',
  'bike',
  'shopping-basket',
  'car',
  'bus',
  'heart',
  'smile',
  'banknote',
  'landmark',
  'calendar',
  'file-text',
  'utensils-crossed',
  'briefcase',
  'fuel',
  'shopping-cart',
  'route',
  'train',
  'heart-pulse',
  'laugh',
  'receipt',
  'house',
  'calendar-check',
  'newspaper',
  'wallet',
  'gift',
  'piggy-bank',
  'trending-up',
  'credit-card',
  'graduation-cap',
]

export const defaultAppearanceColor: AppearanceColor = appearanceColors[0]
export const defaultAppearanceIcon: IconKey = appearanceIcons[0]

export function isValidAppearanceColor(color?: string): color is AppearanceColor {
  return !!color && appearanceColors.includes(color)
}

export function isValidAppearanceIcon(icon?: string): icon is IconKey {
  return !!icon && appearanceIcons.includes(icon as IconKey)
}
