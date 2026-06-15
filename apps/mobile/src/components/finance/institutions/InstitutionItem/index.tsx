import { useState } from 'react'
import { Pressable, View } from 'react-native'
import { ChevronRight, Pencil, Trash2 } from 'lucide-react-native'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { IconTile } from '@/components/finance/institutions/IconTile'
import type { InstitutionListItem } from '@/components/finance/institutions/types'
import type { IconKey } from '@/utils/icons'
import { styles } from './style'

type Props = {
  institution: InstitutionListItem
  onEdit?: (institution: InstitutionListItem) => void
  onDelete?: (id: string) => void
}

export function InstitutionItem({ institution, onEdit, onDelete }: Props) {
  const theme = useThemeColor()
  const [showActions, setShowActions] = useState(false)
  const hasActions = !!onEdit || !!onDelete

  return (
    <Pressable
      onPress={() => {
        if (hasActions) setShowActions((prev) => !prev)
      }}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.surface, borderColor: theme.border },
        pressed && styles.cardPressed,
      ]}
    >
      <IconTile
        icon={(institution.icon ?? 'landmark') as IconKey}
        color={institution.color}
        selected
        onPress={() => {}}
      />

      <View style={styles.info}>
        <ThemedText text={institution.name} variant="title" style={styles.name} numberOfLines={1} />
      </View>

      {showActions && hasActions ? (
        <View style={styles.actions}>
          {onEdit ? (
            <Pressable
              onPress={() => onEdit(institution)}
              hitSlop={8}
              style={({ pressed }) => [
                styles.editButton,
                { backgroundColor: theme.primary, opacity: pressed ? 0.85 : 1 },
              ]}
            >
              <Pencil size={16} color={theme.onPrimary} />
            </Pressable>
          ) : null}
          {onDelete ? (
            <Pressable
              onPress={() => onDelete(institution.id)}
              hitSlop={8}
              style={({ pressed }) => [
                styles.deleteButton,
                { backgroundColor: theme.destructive, opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <Trash2 size={18} color={theme.onPrimary} />
            </Pressable>
          ) : null}
        </View>
      ) : (
        <ChevronRight size={22} color={theme.mutedForeground} />
      )}
    </Pressable>
  )
}
