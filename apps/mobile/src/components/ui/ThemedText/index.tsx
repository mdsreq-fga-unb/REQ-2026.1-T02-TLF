import { Text, TextProps } from 'react-native'
import { styles } from './style'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ReactNode } from 'react'

type props = TextProps & {
  text: string
  children: ReactNode | undefined
}

export function ThemedText({ text, children, style, ...rest }: props) {
  return (
    <Text style={[styles.text, { color: useThemeColor().graySecondary }, style]} {...rest}>
      {text}
      {children}
    </Text>
  )
}
