import { Modal, Pressable, View } from 'react-native'
import { AppIcon } from '@/components/ui/AppIcon'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import {
  useDeleteRecurrenceModal,
  type DeleteScope,
} from '@/hooks/recurrences/useDeleteRecurrenceModal'
import { OptionCard } from '../OptionCard'
import { styles } from './style'
import type { Recurrence } from '../types'

type Props = {
  visible: boolean
  recurrence: Recurrence | null
  onConfirm: (scope: DeleteScope) => void
  onCancel: () => void
}

export function DeleteRecurrenceModal({ visible, recurrence, onConfirm, onCancel }: Props) {
  const theme = useThemeColor()
  const { scope, setScope, amountLabel } = useDeleteRecurrenceModal(recurrence)

  return (
    <Modal
      visible={visible && recurrence !== null}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <Pressable
          style={[styles.sheet, { backgroundColor: theme.surface, borderColor: theme.border }]}
          onPress={() => {}}
        >
          <View style={[styles.iconWrap, { backgroundColor: `${theme.destructive}22` }]}>
            <AppIcon name="trash" size={28} color={theme.destructive} />
          </View>

          <ThemedText style={styles.title} text="Excluir recorrência" />
          <ThemedText
            text={`Deseja excluir a recorrência "${recurrence?.description ?? ''}" no valor de ${amountLabel}?`}
            variant="body"
            tone="muted"
            style={styles.description}
          />

          <View style={styles.options}>
            <OptionCard
              selected={scope === 'keep'}
              onPress={() => setScope('keep')}
              icon="calendar-check"
              title="Manter transações futuras"
              description="As cobranças agendadas para os próximos meses permanecerão no seu extrato."
            />
            <OptionCard
              selected={scope === 'remove'}
              onPress={() => setScope('remove')}
              icon="calendar-x"
              title="Remover também as futuras"
              description="Todas as transações vinculadas a esta recorrência serão removidas permanentemente."
              danger
            />
          </View>

          <View style={styles.buttons}>
            <Pressable
              onPress={onCancel}
              style={({ pressed }) => [
                styles.btn,
                styles.btnCancel,
                { borderColor: theme.border, opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <ThemedText style={styles.btnText} text="Cancelar" />
            </Pressable>

            <Pressable
              onPress={() => onConfirm(scope)}
              style={({ pressed }) => [
                styles.btn,
                { backgroundColor: theme.destructive, opacity: pressed ? 0.85 : 1 },
              ]}
            >
              <AppIcon name="trash" size={18} color={theme.onPrimary} />
              <ThemedText tone="onPrimary" style={styles.btnText} text="Excluir" />
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}
