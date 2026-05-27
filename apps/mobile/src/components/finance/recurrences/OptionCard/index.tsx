import { Pressable, Text, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { styles } from './style'

type Props = {
  selected: boolean
  onPress: () => void
  icon: string
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
        <MaterialIcons
          name={icon as any}
          size={20}
          color={selected ? accentColor : theme.mutedForeground}
        />
      </View>
      <View style={styles.optionText}>
        <Text style={[styles.optionTitle, { color: selected ? accentColor : theme.foreground }]}>
          {title}
        </Text>
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
