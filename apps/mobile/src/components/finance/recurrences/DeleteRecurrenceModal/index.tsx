import { Modal, Pressable, Text, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useDeleteRecurrenceModal, type DeleteScope } from '@/hooks/useDeleteRecurrenceModal'
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
            <MaterialIcons name="delete-forever" size={28} color={theme.destructive} />
          </View>

          <ThemedText style={styles.title} text="Excluir recorrência" />
          <Text style={[styles.description, { color: theme.mutedForeground }]}>
            Deseja excluir a recorrência{' '}
            <Text style={{ color: theme.foreground, fontWeight: '600' }}>
              "{recurrence?.description ?? ''}"
            </Text>{' '}
            no valor de{' '}
            <Text style={{ color: theme.destructive, fontWeight: '600' }}>{amountLabel}</Text>?
          </Text>

          <View style={styles.options}>
            <OptionCard
              selected={scope === 'keep'}
              onPress={() => setScope('keep')}
              icon="event-available"
              title="Manter transações futuras"
              description="As cobranças agendadas para os próximos meses permanecerão no seu extrato."
            />
            <OptionCard
              selected={scope === 'remove'}
              onPress={() => setScope('remove')}
              icon="event-busy"
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
              <MaterialIcons name="delete" size={18} color="#fff" />
              <ThemedText tone="onPrimary" style={styles.btnText} text="Excluir" />
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}
