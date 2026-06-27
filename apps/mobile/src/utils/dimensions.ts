export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
} as const

export const radius = {
  xs: 4,
  sm: 12,
  md: 16,
  lg: 24,
  full: 9999,
} as const

export const component = {
  buttonRadius: radius.lg,
  buttonPaddingVertical: spacing.sm,
  inputRadius: radius.md,
  inputPaddingHorizontal: spacing.sm,
  cardRadius: radius.lg,
  cardPadding: spacing.md,
  screenGutter: spacing.md,
} as const

export const layout = {
  separatorHeight: 2,
  maxFormWidthPct: '100%' as const,
  authLogoSize: 200,
  minTouchTarget: 40,
} as const

export const iconSize = {
  sm: 18,
  md: 22,
  tab: 26,
  lg: 28,
  xlg: 38,
  xxlg: 50,
} as const
