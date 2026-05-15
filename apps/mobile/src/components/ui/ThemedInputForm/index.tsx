import { useThemeColor } from '@/hooks/useThemeColor'
import { iconSize } from '@/utils/dimensions'
import { typography } from '@/utils/typography'
import type { ComponentType } from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
import { styles } from './style'

type IconProps = { size?: number; color?: string }

type props = TextInputProps & {
  icon?: ComponentType<IconProps>
}

export function ThemedInputForm({ icon: Icon, style, placeholderTextColor, ...rest }: props) {
  const colors = useThemeColor()

  return (
    <View
      style={[
        styles.inputForm,
        {
          backgroundColor: colors.surfaceMuted,
          borderColor: colors.border,
        },
      ]}
    >
      {Icon && (
        <View style={styles.iconWrap}>
          <Icon size={iconSize.lg} color={colors.mutedForeground} />
        </View>
      )}
      <TextInput
        {...rest}
        placeholderTextColor={placeholderTextColor ?? colors.mutedForeground}
        style={[styles.input, typography.body, { color: colors.foreground }, style]}
      />
    </View>
  )
}
