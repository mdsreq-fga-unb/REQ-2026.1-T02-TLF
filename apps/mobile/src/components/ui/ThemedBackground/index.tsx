import { useThemeColor } from '@/hooks/useThemeColor'
import { styles } from './style'
import { View, ViewProps } from 'react-native'

type props = ViewProps & {
  children: React.ReactNode
}

export function ThemedBackground({ children, style, ...rest }: props) {
  const colors = useThemeColor()

  return (
    <View style={[styles.background, { backgroundColor: colors.background }, style]} {...rest}>
      {children}
    </View>
  )
}
