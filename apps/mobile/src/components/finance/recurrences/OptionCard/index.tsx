import { Pressable, View } from 'react-native'
import { AppIcon } from '@/components/ui/AppIcon'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import type { IconKey } from '@/utils/icons'
import { styles } from './style'

type Props = {
  selected: boolean
  onPress: () => void
  icon: IconKey
  title: string
  description: string
  danger?: boolean
}

export function OptionCard({ selected, onPress, icon, title, description, danger }: Props) {
  const theme = useThemeColor()
  const accentColor = danger ? theme.destructive : theme.primary
  const borderColor = selected ? accentColor : theme.border
  const bgColor = selected ? `${accentColor}18` : theme.surfaceMuted

  return (
    <Pressable onPress={onPress} style={[styles.option, { backgroundColor: bgColor, borderColor }]}>
      <View style={styles.optionLeft}>
        <AppIcon name={icon} size={20} color={selected ? accentColor : theme.mutedForeground} />
      </View>
      <View style={styles.optionText}>
        <ThemedText
          text={title}
          variant="label"
          tone={selected ? (danger ? 'destructive' : 'primary') : 'default'}
          style={styles.optionTitle}
        />
        <ThemedText tone="muted" style={styles.optionDesc} text={description} />
      </View>
      <View
        style={[
          styles.radio,
          {
            borderColor: selected ? accentColor : theme.border,
            backgroundColor: selected ? accentColor : 'transparent',
          },
        ]}
      >
        <View style={[styles.radioDot, { display: selected ? 'flex' : 'none' }]} />
      </View>
    </Pressable>
  )
}
