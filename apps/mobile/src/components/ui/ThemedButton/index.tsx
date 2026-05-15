import { useThemeColor } from '@/hooks/useThemeColor'
import { resolveButtonFill, type ButtonFillTone, type TextTone } from '@/utils/textTone'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { ThemedText, type TextTypographyVariant } from '../ThemedText'
import { styles } from './style'

type props = TouchableOpacityProps & {
  title: string
  textVariant?: TextTypographyVariant
  textTone?: TextTone
  fillTone?: ButtonFillTone
}

export function ThemedButton({
  title,
  disabled,
  onPress,
  textVariant = 'button',
  textTone = 'onPrimary',
  fillTone = 'primary',
  style,
  ...rest
}: props) {
  const colors = useThemeColor()

  const backgroundColor = disabled ? colors.primaryDisabled : resolveButtonFill(colors, fillTone)

  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.85}
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, disabled && styles.buttonDisabled, { backgroundColor }, style]}
      {...rest}
    >
      <ThemedText
        variant={textVariant}
        tone={disabled ? 'muted' : textTone}
        text={title}
        style={styles.label}
      />
    </TouchableOpacity>
  )
}
