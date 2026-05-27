import { Modal, Pressable, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useEditScopeModal, type EditScope } from '@/hooks/useEditScopeModal'
import { OptionCard } from '../OptionCard'
import { styles } from './style'

type Props = {
  visible: boolean
  onConfirm: (scope: EditScope) => void
  onCancel: () => void
}

export type { EditScope }

export function EditScopeModal({ visible, onConfirm, onCancel }: Props) {
  const theme = useThemeColor()
  const { scope, setScope, handleConfirm, handleCancel } = useEditScopeModal(onConfirm, onCancel)

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleCancel}>
      <Pressable style={styles.backdrop} onPress={handleCancel}>
        <Pressable
          style={[styles.sheet, { backgroundColor: theme.surface, borderColor: theme.border }]}
          onPress={() => {}}
        >
          <View style={[styles.iconWrap, { backgroundColor: `${theme.primary}22` }]}>
            <MaterialIcons name="edit" size={28} color={theme.primary} />
          </View>

          <ThemedText style={styles.title} text="Onde aplicar as alterações?" />
          <ThemedText
            tone="muted"
            style={styles.description}
            text="Esta é uma transação recorrente. Escolha como deseja propagar os novos dados."
          />

          <View style={styles.options}>
            <OptionCard
              selected={scope === 'upcoming'}
              onPress={() => setScope('upcoming')}
              icon="update"
              title="Apenas próximas ocorrências"
              description="Alterações valem de agora em diante. O histórico permanece intacto."
            />
            <OptionCard
              selected={scope === 'all'}
              onPress={() => setScope('all')}
              icon="history"
              title="Todas as ocorrências"
              description="Inclui transações passadas vinculadas. Útil para corrigir erros retroativos."
            />
          </View>

          <View style={styles.buttons}>
            <Pressable
              onPress={handleCancel}
              style={({ pressed }) => [
                styles.btn,
                styles.btnCancel,
                { backgroundColor: theme.surfaceMuted, opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <ThemedText tone="muted" style={styles.btnText} text="Cancelar" />
            </Pressable>

            <Pressable
              onPress={handleConfirm}
              style={({ pressed }) => [
                styles.btn,
                { backgroundColor: theme.primary, opacity: pressed ? 0.85 : 1 },
              ]}
            >
              <MaterialIcons name="check" size={18} color={theme.onPrimary} />
              <ThemedText tone="onPrimary" style={styles.btnText} text="Confirmar e Atualizar" />
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}
