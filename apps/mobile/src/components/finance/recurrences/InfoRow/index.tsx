import { StyleSheet, View } from 'react-native'
import { AppIcon } from '@/components/ui/AppIcon'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import type { IconKey } from '@/utils/icons'

type Props = {
  icon: IconKey
  label: string
  color?: string
}

export function InfoRow({ icon, label, color }: Props) {
  const theme = useThemeColor()
  return (
    <View style={styles.row}>
      <AppIcon name={icon} size={16} color={color ?? theme.mutedForeground} />
      <ThemedText text={label} variant="label" style={[styles.label, color ? { color } : null]} />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
})
