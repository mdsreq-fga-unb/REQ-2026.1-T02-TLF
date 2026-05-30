import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { ThemedText } from '@/components/ui/ThemedText'
import { styles } from './style'
import { useThemeColor } from '@/hooks/useThemeColor'

type props = TouchableOpacityProps & {
  title: string
}

export function ButtonPrimary({ title, disabled, onPress }: props) {
  const themeColor = useThemeColor()

  return (
    <TouchableOpacity
      activeOpacity={disabled ? 0.7 : 1}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        disabled && styles.buttonDisabled,
        { backgroundColor: themeColor.primary },
        disabled && { backgroundColor: themeColor.primaryDisabled },
      ]}
    >
      <ThemedText text={title} variant="button" tone="onPrimary" style={styles.text} />
    </TouchableOpacity>
  )
}
