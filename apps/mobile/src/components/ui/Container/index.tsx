import { styles } from './style'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ReactNode } from 'react'
import { View, ViewProps } from 'react-native'

type props = ViewProps & {
  children: ReactNode
}

export function Container({ children, style, ...rest }: props) {
  return (
    <View style={[styles.container, { backgroundColor: useThemeColor().gray }, style]} {...rest}>
      {children}
    </View>
  )
}
