import { StyleSheet, Text, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useThemeColor } from '@/hooks/useThemeColor'
import type { ComponentProps } from 'react'

type IconName = ComponentProps<typeof MaterialIcons>['name']

type Props = {
  icon: IconName
  label: string
  color?: string
}

export function InfoRow({ icon, label, color }: Props) {
  const theme = useThemeColor()
  return (
    <View style={styles.row}>
      <MaterialIcons name={icon} size={16} color={color ?? theme.mutedForeground} />
      <Text style={[styles.label, { color: color ?? theme.foreground }]}>{label}</Text>
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
