import { styles } from './style'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ReactNode } from 'react'
import { View, ViewProps } from 'react-native'
import { ThemedText } from '../ThemedText'

type props = ViewProps & {
  children: ReactNode
  text: string
}

export function InputContainer({ text, children, style, ...rest }: props) {
  return (
    <View style={[styles.inputContainer, { backgroundColor: 'transparent' }, style]} {...rest}>
      <ThemedText text={text} children style={{ color: useThemeColor().text }} />
      {children}
    </View>
  )
}
