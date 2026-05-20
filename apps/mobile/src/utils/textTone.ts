import type { SemanticColors } from '@/utils/colors'

export type TextTone =
  | 'default'
  | 'muted'
  | 'destructive'
  | 'warning'
  | 'link'
  | 'primary'
  | 'onPrimary'

export function resolveTextTone(colors: SemanticColors, tone: TextTone): string {
  switch (tone) {
    case 'muted':
      return colors.mutedForeground
    case 'destructive':
      return colors.destructive
    case 'warning':
      return colors.warning
    case 'link':
      return colors.link
    case 'primary':
      return colors.primary
    case 'onPrimary':
      return colors.onPrimary
    default:
      return colors.foreground
  }
}

export type ButtonFillTone = 'primary' | 'destructive' | 'warning' | 'surface' | 'muted'

export function resolveButtonFill(colors: SemanticColors, fill: ButtonFillTone): string {
  switch (fill) {
    case 'destructive':
      return colors.destructive
    case 'warning':
      return colors.warning
    case 'surface':
      return colors.surface
    case 'muted':
      return colors.surfaceMuted
    default:
      return colors.primary
  }
}
