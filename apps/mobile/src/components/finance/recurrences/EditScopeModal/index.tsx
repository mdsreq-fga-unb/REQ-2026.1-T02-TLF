import { useState } from 'react'
import { Modal, Pressable, Text, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useThemeColor } from '@/hooks/useThemeColor'
import { styles } from './style'

export type EditScope = 'upcoming' | 'all'

type Props = {
  visible: boolean
  onConfirm: (scope: EditScope) => void
  onCancel: () => void
}

type OptionCardProps = {
  selected: boolean
  onPress: () => void
  icon: string
  title: string
  description: string
  theme: ReturnType<typeof useThemeColor>
}

function OptionCard({ selected, onPress, icon, title, description, theme }: OptionCardProps) {
  const borderColor = selected ? theme.primary : theme.border
  const bgColor = selected ? `${theme.primary}18` : theme.surfaceMuted

  return (
    <Pressable onPress={onPress} style={[styles.option, { backgroundColor: bgColor, borderColor }]}>
      <View style={styles.optionLeft}>
        <MaterialIcons
          name={icon as any}
          size={20}
          color={selected ? theme.primary : theme.mutedForeground}
        />
      </View>
      <View style={styles.optionText}>
        <Text style={[styles.optionTitle, { color: selected ? theme.primary : theme.foreground }]}>
          {title}
        </Text>
        <Text style={[styles.optionDesc, { color: theme.mutedForeground }]}>{description}</Text>
      </View>
      <View
        style={[
          styles.radio,
          {
            borderColor: selected ? theme.primary : theme.border,
            backgroundColor: selected ? theme.primary : 'transparent',
          },
        ]}
      >
        <View style={[styles.radioDot, { display: selected ? 'flex' : 'none' }]} />
      </View>
    </Pressable>
  )
}

export function EditScopeModal({ visible, onConfirm, onCancel }: Props) {
  const theme = useThemeColor()
  const [scope, setScope] = useState<EditScope>('upcoming')

  const handleConfirm = () => {
    onConfirm(scope)
    setScope('upcoming')
  }

  const handleCancel = () => {
    setScope('upcoming')
    onCancel()
  }

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

          <Text style={[styles.title, { color: theme.foreground }]}>
            Onde aplicar as alterações?
          </Text>
          <Text style={[styles.description, { color: theme.mutedForeground }]}>
            Esta é uma transação recorrente. Escolha como deseja propagar os novos dados.
          </Text>

          <View style={styles.options}>
            <OptionCard
              selected={scope === 'upcoming'}
              onPress={() => setScope('upcoming')}
              icon="update"
              title="Apenas próximas ocorrências"
              description="Alterações valem de agora em diante. O histórico permanece intacto."
              theme={theme}
            />
            <OptionCard
              selected={scope === 'all'}
              onPress={() => setScope('all')}
              icon="history"
              title="Todas as ocorrências"
              description="Inclui transações passadas vinculadas. Útil para corrigir erros retroativos."
              theme={theme}
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
              <Text style={[styles.btnText, { color: theme.mutedForeground }]}>Cancelar</Text>
            </Pressable>

            <Pressable
              onPress={handleConfirm}
              style={({ pressed }) => [
                styles.btn,
                { backgroundColor: theme.primary, opacity: pressed ? 0.85 : 1 },
              ]}
            >
              <MaterialIcons name="check" size={18} color={theme.onPrimary} />
              <Text style={[styles.btnText, { color: theme.onPrimary }]}>
                Confirmar e Atualizar
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}
