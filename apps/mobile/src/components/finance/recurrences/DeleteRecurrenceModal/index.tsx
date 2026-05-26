import { useState } from 'react'
import { Modal, Pressable, Text, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useThemeColor } from '@/hooks/useThemeColor'
import { formatCurrency } from '@/utils/formatters'
import { styles } from './style'
import type { Recurrence } from '../types'

const RED = '#FF4B4B'

type DeleteScope = 'keep' | 'remove'

type Props = {
  visible: boolean
  recurrence: Recurrence | null
  onConfirm: (scope: DeleteScope) => void
  onCancel: () => void
}

type OptionProps = {
  selected: boolean
  onPress: () => void
  icon: string
  title: string
  description: string
  danger?: boolean
  theme: ReturnType<typeof useThemeColor>
}

function OptionCard({ selected, onPress, icon, title, description, danger, theme }: OptionProps) {
  const accentColor = danger ? RED : theme.primary
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
        <Text style={[styles.optionDesc, { color: theme.mutedForeground }]}>{description}</Text>
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
        {selected && <View style={styles.radioDot} />}
      </View>
    </Pressable>
  )
}

export function DeleteRecurrenceModal({ visible, recurrence, onConfirm, onCancel }: Props) {
  const theme = useThemeColor()
  const [scope, setScope] = useState<DeleteScope>('keep')

  if (!recurrence) return null

  const amountLabel = formatCurrency(recurrence.amount)

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <Pressable
          style={[styles.sheet, { backgroundColor: theme.surface, borderColor: theme.border }]}
          onPress={() => {}}
        >
          <View style={[styles.iconWrap, { backgroundColor: `${RED}22` }]}>
            <MaterialIcons name="delete-forever" size={28} color={RED} />
          </View>

          <Text style={[styles.title, { color: theme.foreground }]}>Excluir recorrência</Text>
          <Text style={[styles.description, { color: theme.mutedForeground }]}>
            Deseja excluir a recorrência{' '}
            <Text style={{ color: theme.foreground, fontWeight: '600' }}>
              "{recurrence.description}"
            </Text>{' '}
            no valor de <Text style={{ color: RED, fontWeight: '600' }}>{amountLabel}</Text>?
          </Text>

          <View style={styles.options}>
            <OptionCard
              selected={scope === 'keep'}
              onPress={() => setScope('keep')}
              icon="event-available"
              title="Manter transações futuras"
              description="As cobranças agendadas para os próximos meses permanecerão no seu extrato."
              theme={theme}
            />
            <OptionCard
              selected={scope === 'remove'}
              onPress={() => setScope('remove')}
              icon="event-busy"
              title="Remover também as futuras"
              description="Todas as transações vinculadas a esta recorrência serão removidas permanentemente."
              theme={theme}
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
              <Text style={[styles.btnText, { color: theme.foreground }]}>Cancelar</Text>
            </Pressable>

            <Pressable
              onPress={() => onConfirm(scope)}
              style={({ pressed }) => [
                styles.btn,
                styles.btnDelete,
                { backgroundColor: RED, opacity: pressed ? 0.85 : 1 },
              ]}
            >
              <MaterialIcons name="delete" size={18} color="#fff" />
              <Text style={[styles.btnText, { color: '#fff' }]}>Excluir</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}
