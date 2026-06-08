import { View } from 'react-native'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { IconTile } from '@/components/finance/institutions/IconTile'
import type { IconKey } from '@/utils/icons'
import { styles } from './style'

type Props = {
  name: string
  color: string
  icon: IconKey
}

export function InstitutionPreviewCard({ name, color, icon }: Props) {
  const theme = useThemeColor()

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <View style={styles.avatar}>
        <IconTile icon={icon} color={color} selected onPress={() => {}} />
      </View>
      <ThemedText text={name} variant="title" style={styles.name} numberOfLines={1} />
      <ThemedText
        text="Visualização da Instituição"
        variant="label"
        tone="muted"
        style={styles.caption}
      />
    </View>
  )
}
