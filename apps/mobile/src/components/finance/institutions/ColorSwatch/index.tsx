import { Pressable, View } from 'react-native'
import type { AppearanceColor } from '@/services/institutions/appearance'
import { styles } from './style'

type Props = {
  color: AppearanceColor
  selected: boolean
  onPress: () => void
}

export function ColorSwatch({ color, selected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={6}
      style={({ pressed }) => [
        styles.ring,
        selected && { borderColor: color },
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.swatch,
          { backgroundColor: color },
          selected && styles.swatchSelected,
          selected && {
            shadowColor: color,
            shadowOpacity: 0.9,
            shadowRadius: 8,
            elevation: 8,
          },
        ]}
      />
    </Pressable>
  )
}
