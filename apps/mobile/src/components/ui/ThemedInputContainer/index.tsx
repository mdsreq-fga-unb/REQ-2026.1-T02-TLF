import { styles } from './style'
import { ReactNode } from 'react'
import { View, ViewProps } from 'react-native'
import { ThemedText } from '../ThemedText'

type props = ViewProps & {
  children: ReactNode
  text: string
}

export function ThemedInputContainer({ text, children, style, ...rest }: props) {
  return (
    <View style={[styles.inputContainer, { backgroundColor: 'transparent' }, style]} {...rest}>
      <ThemedText variant="label" text={text.trimStart()} style={styles.fieldLabel} />
      {children}
    </View>
  )
}
