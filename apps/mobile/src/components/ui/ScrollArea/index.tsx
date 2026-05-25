import { styles } from './style'
import { ReactNode } from 'react'
import { ScrollView, ScrollViewProps } from 'react-native'

type props = ScrollViewProps & {
  children: ReactNode
}

export function ScrollArea({ children, style, contentContainerStyle, ...rest }: props) {
  return (
    <ScrollView
      style={[{ backgroundColor: 'transparent' }, style]}
      contentContainerStyle={[styles.scrollArea, contentContainerStyle]}
      {...rest}
    >
      {children}
    </ScrollView>
  )
}
