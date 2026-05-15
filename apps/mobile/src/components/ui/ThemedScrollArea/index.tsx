import { styles } from './style'
import { useThemeColor } from '@/hooks/useThemeColor'
import { component } from '@/utils/dimensions'
import { ReactNode } from 'react'
import { ScrollView, ScrollViewProps } from 'react-native'

type props = ScrollViewProps & {
  children: ReactNode
}

export function ThemedScrollArea({
  children,
  style,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  ...rest
}: props) {
  const colors = useThemeColor()

  return (
    <ScrollView
      style={[styles.scrollRoot, style]}
      contentContainerStyle={[
        styles.scrollContent,
        {
          backgroundColor: colors.background,
          paddingHorizontal: component.screenGutter,
        },
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      {...rest}
    >
      {children}
    </ScrollView>
  )
}
