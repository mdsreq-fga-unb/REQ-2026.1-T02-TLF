import { styles } from './style'
import { ReactNode } from 'react'
import { ScrollView, ScrollViewProps } from 'react-native'

type props = ScrollViewProps & {
  children: ReactNode
}

export function ScrollArea({ children, style, ...rest }: props) {
  return (
    <ScrollView style={[styles.scrollArea, { backgroundColor: 'transparent' }, style]} {...rest}>
      {children}
    </ScrollView>
  )
}
