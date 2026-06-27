import { Pressable, View } from 'react-native'
import { Pencil, Trash2 } from 'lucide-react-native'
import { AppIcon } from '@/components/ui/AppIcon'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { InfoRow } from '../InfoRow'
import type { IconKey } from '@/utils/icons'
import { styles } from './style'

type Props = {
  description: string
  typeLabel: string
  icon: IconKey
  iconColor: string
  intFormatted: string
  decPart: string
  amountColor: string
  isActive: boolean
  statusColor: string
  accountName: string
  nextBillingLabel: string
  frequencyLabel: string
  onEdit: () => void
  onDelete: () => void
}

export function RecurrenceDetailsCard({
  description,
  typeLabel,
  icon,
  iconColor,
  intFormatted,
  decPart,
  amountColor,
  isActive,
  statusColor,
  accountName,
  nextBillingLabel,
  frequencyLabel,
  onEdit,
  onDelete,
}: Props) {
  const theme = useThemeColor()

  return (
    <View style={[styles.mainCard, { backgroundColor: theme.surface }]}>
      <View style={styles.cardTop}>
        <View style={[styles.iconCircle, { backgroundColor: `${iconColor}28` }]}>
          <AppIcon name={icon} size={28} color={iconColor} />
        </View>
        <View style={styles.cardTopText}>
          <ThemedText tone="muted" style={styles.typeLabel} text={typeLabel.toUpperCase()} />
          <ThemedText style={styles.descriptionText} text={description} />
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.border }]} />

      <View style={styles.amountRow}>
        <View style={styles.amountBlock}>
          <ThemedText tone="muted" style={styles.amountCurrency} text="R$" />
          <ThemedText
            text={`${intFormatted},${decPart}`}
            variant="display"
            style={[styles.amountNumber, { color: amountColor }]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.6}
          />
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${statusColor}22` }]}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <ThemedText
            text={isActive ? 'ATIVO' : 'INATIVO'}
            variant="caption"
            style={[styles.statusText, { color: statusColor }]}
          />
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.border }]} />

      <View style={styles.infoBlock}>
        <InfoRow icon="landmark" label={accountName} />
        <InfoRow
          icon="calendar"
          label={`Próxima cobrança: ${nextBillingLabel}`}
          color={theme.primary}
        />
        <InfoRow icon="refresh-cw" label={frequencyLabel} />
      </View>

      <View style={[styles.divider, { backgroundColor: theme.border }]} />

      <View style={styles.btnRow}>
        <Pressable
          onPress={onEdit}
          style={({ pressed }) => [
            styles.btn,
            { backgroundColor: theme.primary, opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <Pencil size={18} color={theme.onPrimary} />
          <ThemedText tone="onPrimary" style={styles.btnText} text="Editar" />
        </Pressable>
        <Pressable
          onPress={onDelete}
          style={({ pressed }) => [
            styles.btn,
            { backgroundColor: theme.destructive, opacity: pressed ? 0.75 : 1 },
          ]}
        >
          <Trash2 size={18} color={theme.onPrimary} />
          <ThemedText tone="onPrimary" style={styles.btnText} text="Excluir" />
        </Pressable>
      </View>
    </View>
  )
}
