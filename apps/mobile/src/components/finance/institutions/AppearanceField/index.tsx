import { Pressable, View } from 'react-native'
import { ChevronRight } from 'lucide-react-native'
import { AppIcon } from '@/components/ui/AppIcon'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import type { IconKey } from '@/utils/icons'
import { styles } from './style'

type Props = {
  color: string
  icon: IconKey
  title?: string
  description?: string
  actionLabel?: string
  onPress: () => void
}

export function AppearanceField({
  color,
  icon,
  title = 'Personalizar',
  description = 'Cor e ícone da marca',
  actionLabel = 'Mudar',
  onPress,
}: Props) {
  const theme = useThemeColor()

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        { backgroundColor: theme.surface, borderColor: theme.border },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.left}>
        <View
          style={[styles.colorDot, { backgroundColor: color, borderColor: theme.background }]}
        />
        <View style={styles.texts}>
          <View style={styles.titleRow}>
            <AppIcon name={icon} size={18} color={color} />
            <ThemedText text={title} variant="label" style={styles.title} />
          </View>
          <ThemedText
            text={description}
            variant="caption"
            tone="muted"
            style={styles.description}
          />
        </View>
      </View>

      <View style={styles.action}>
        <ThemedText text={actionLabel} variant="label" tone="primary" style={styles.actionLabel} />
        <ChevronRight size={20} color={theme.primary} />
      </View>
    </Pressable>
  )
}
