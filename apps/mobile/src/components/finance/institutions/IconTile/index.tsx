import { Pressable } from 'react-native'
import { AppIcon } from '@/components/ui/AppIcon'
import { useThemeColor } from '@/hooks/useThemeColor'
import type { IconKey } from '@/utils/icons'
import { styles } from './style'

type Props = {
  icon: IconKey
  selected: boolean
  color: string
  onPress: () => void
}

export function IconTile({ icon, selected, color, onPress }: Props) {
  const theme = useThemeColor()

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tile,
        {
          backgroundColor: selected ? `${color}1A` : theme.surfaceMuted,
          borderColor: selected ? `${color}4D` : 'transparent',
        },
        pressed && styles.pressed,
      ]}
    >
      <AppIcon name={icon} size={28} color={selected ? color : theme.mutedForeground} />
    </Pressable>
  )
}
