import { styles } from './style'
import { useThemeColor } from '@/hooks/useThemeColor'
import { component, spacing } from '@/utils/dimensions'
import { ReactNode } from 'react'
import { View, ViewProps } from 'react-native'

type props = ViewProps & {
  children: ReactNode
  variant?: 'default' | 'transparent'
}

export function ThemedContainer({ children, style, variant = 'default', ...rest }: props) {
  const colors = useThemeColor()

  const backgroundColor = variant === 'transparent' ? 'transparent' : colors.surface

  const surfaceStyle =
    variant === 'transparent'
      ? { padding: 0, gap: spacing.md, borderRadius: 0 }
      : {
          padding: component.cardPadding,
          gap: spacing.md,
          borderRadius: component.cardRadius,
        }

  return (
    <View style={[styles.container, surfaceStyle, { backgroundColor }, style]} {...rest}>
      {children}
    </View>
  )
}
