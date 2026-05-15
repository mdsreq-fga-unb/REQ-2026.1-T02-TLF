export type SemanticColors = {
  background: string
  foreground: string
  mutedForeground: string
  surface: string
  surfaceMuted: string
  border: string
  primary: string
  onPrimary: string
  primaryDisabled: string
  link: string
  linkMuted: string
  destructive: string
  warning: string
  tabBarBorder: string
  tabActive: string
  tabInactive: string
}

export const themes: Record<'light' | 'dark', SemanticColors> = {
  dark: {
    background: '#121418',
    foreground: '#FAFAFB',
    mutedForeground: '#8B8C98',
    surface: '#1E232D',
    surfaceMuted: '#2F3440',
    border: '#454B57',
    primary: '#6A66FF',
    onPrimary: '#121418',
    primaryDisabled: '#454B57',
    link: '#9188FF',
    linkMuted: '#6A66FF99',
    destructive: '#D14349',
    warning: '#C16000',
    tabBarBorder: '#1E232D',
    tabActive: '#6A66FF',
    tabInactive: '#777681',
  },
  light: {
    background: '#F4F4F5',
    foreground: '#09090B',
    mutedForeground: '#777681',
    surface: '#FFFFFF',
    surfaceMuted: '#E4E4E7',
    border: '#D4D4D8',
    primary: '#6A66FF',
    onPrimary: '#FFFFFF',
    primaryDisabled: '#D4D4D8',
    link: '#5B57E6',
    linkMuted: '#6A66FFB3',
    destructive: '#C1272D',
    warning: '#C16000',
    tabBarBorder: '#E4E4E7',
    tabActive: '#6A66FF',
    tabInactive: '#8B8C98',
  },
}
