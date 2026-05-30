import { Pressable, View } from 'react-native'
import { AppIcon } from '@/components/ui/AppIcon'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useConfirmCard } from '@/hooks/useConfirmCard'
import { formatCurrency } from '@/utils/formatters'
import { styles } from './style'
import type { Recurrence } from '../types'

type Props = {
  recurrence: Recurrence
  isConfirmed: boolean
  isSkipped: boolean
  onConfirm: (id: string) => void
  onSkip: (id: string) => void
  onUndo: (id: string) => void
}

export function ConfirmCard({
  recurrence,
  isConfirmed,
  isSkipped,
  onConfirm,
  onSkip,
  onUndo,
}: Props) {
  const theme = useThemeColor()
  const { icon, iconBg, accountName, subcategoryName, isExpense, amountSign, acted } =
    useConfirmCard(recurrence, isConfirmed, isSkipped)

  const amountColor = isExpense ? theme.expense : theme.success

  return (
    <View style={[styles.card, { backgroundColor: theme.surface }, acted && styles.cardActed]}>
      <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
        <AppIcon name={icon} size={20} color={theme.onPrimary} />
      </View>

      <View style={styles.cardBody}>
        <View style={styles.cardTopRow}>
          <ThemedText style={styles.cardName} text={recurrence.description} numberOfLines={1} />
          <View style={[styles.badge, { display: isConfirmed ? 'flex' : 'none' }]}>
            <AppIcon name="circle-check" size={13} color={theme.success} />
            <ThemedText
              text="Confirmado"
              variant="caption"
              tone="default"
              style={[styles.badgeText, { color: theme.success }]}
            />
          </View>
          <View style={[styles.badge, { display: isSkipped ? 'flex' : 'none' }]}>
            <AppIcon name="skip-forward" size={13} color={theme.mutedForeground} />
            <ThemedText tone="muted" style={styles.badgeText} text="Pulado" />
          </View>
        </View>

        <ThemedText
          tone="muted"
          style={styles.cardMeta}
          text={`${accountName} · ${subcategoryName} · Dia ${recurrence.dueDay}`}
        />

        <View style={styles.cardBottomRow}>
          <ThemedText
            text={`${amountSign} ${formatCurrency(recurrence.amount)}`}
            variant="title"
            style={[styles.cardAmount, { color: amountColor }]}
          />

          <View style={[styles.btnGroup, { display: acted ? 'none' : 'flex' }]}>
            <Pressable
              onPress={() => onSkip(recurrence.id)}
              style={({ pressed }) => [
                styles.btn,
                styles.btnSkip,
                { borderColor: theme.border, opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <ThemedText tone="muted" style={styles.btnSkipText} text="Pular" />
            </Pressable>

            <Pressable
              onPress={() => onConfirm(recurrence.id)}
              style={({ pressed }) => [
                styles.btn,
                { backgroundColor: theme.success, opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <AppIcon name="check" size={13} color={theme.onPrimary} />
              <ThemedText
                text="Confirmar"
                variant="button"
                tone="onPrimary"
                style={styles.btnConfirmText}
              />
            </Pressable>
          </View>

          <Pressable
            onPress={() => onUndo(recurrence.id)}
            style={({ pressed }) => [
              styles.btn,
              styles.btnUndo,
              {
                borderColor: theme.border,
                opacity: pressed ? 0.7 : 1,
                display: acted ? 'flex' : 'none',
              },
            ]}
          >
            <AppIcon name="undo" size={13} color={theme.mutedForeground} />
            <ThemedText tone="muted" style={styles.btnUndoText} text="Desfazer" />
          </Pressable>
        </View>
      </View>
    </View>
  )
}
