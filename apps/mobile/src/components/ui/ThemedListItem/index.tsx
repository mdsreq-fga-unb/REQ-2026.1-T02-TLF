import { iconSize } from '@/utils/dimensions'
import { styles } from './style'
import { ComponentType } from 'react'
import { Pressable, PressableProps, View } from 'react-native'
import { TextTone, TextTypographyVariant, ThemedText } from '../ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { resolveTextTone } from '@/utils/textTone'

type IconProps = { size?: number; color?: string }
type Start = 'left' | 'right'
type boxType = 'square' | 'round'
type FilledType = 'transparent' | 'filled'
type IconSizeKey = keyof typeof iconSize

type props = PressableProps & {
  icon?: ComponentType<IconProps>
  variant?: TextTypographyVariant
  textTone?: TextTone
  iconTone?: TextTone
  iconColor?: string
  text?: string
  start?: Start
  iconSize?: IconSizeKey
  boxType?: boxType
  boxColor?: string
  filled?: FilledType
}

export function ThemedListItem({
  icon: Icon,
  variant = 'bodyLarge',
  textTone = 'default',
  iconTone = 'muted',
  iconColor = '',
  text = 'item',
  start = 'left',
  iconSize: iconSizeKey = 'lg',
  boxType = 'square',
  boxColor = '',
  filled = 'transparent',
  onPress,
}: props) {
  const colors = useThemeColor()
  const size = iconSize[iconSizeKey]
  if (start === 'right')
    return (
      <Pressable
        style={[
          styles.listContainer,
          filled == 'transparent' ? '' : styles.filledRightContainer,
          filled == 'transparent' ? '' : { backgroundColor: colors.surface },
          { justifyContent: 'space-between' },
        ]}
        onPress={onPress}
      >
        <ThemedText children text={text} tone={textTone} variant={variant} />
        {Icon && (
          <View
            style={[
              boxType == 'square' ? styles.squareWrap : styles.roundWrap,
              boxColor ? { backgroundColor: boxColor } : { backgroundColor: colors.surface },
            ]}
          >
            <Icon size={size} color={iconColor ? iconColor : resolveTextTone(colors, iconTone)} />
          </View>
        )}
      </Pressable>
    )
  return (
    <Pressable
      style={[
        styles.listContainer,
        filled == 'transparent' ? '' : styles.filledLeftContainer,
        filled == 'transparent' ? '' : { backgroundColor: colors.surface },
      ]}
      onPress={onPress}
    >
      {Icon && (
        <View
          style={[
            boxType == 'square' ? styles.squareWrap : styles.roundWrap,
            boxColor ? { backgroundColor: boxColor } : { backgroundColor: colors.surface },
          ]}
        >
          <Icon size={size} color={iconColor ? iconColor : resolveTextTone(colors, iconTone)} />
        </View>
      )}
      <ThemedText children text={text} tone={textTone} variant={variant} />
    </Pressable>
  )
}
