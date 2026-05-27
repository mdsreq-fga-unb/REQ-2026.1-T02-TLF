import { Pressable, StyleSheet, Text, View } from 'react-native'
import { TYPE_COLORS, type TransactionType } from './types'

// Design system tokens
const OUTLINE = '#908fa0'
const OUTLINE_VARIANT = '#464554'

type Props = {
  value: TransactionType
  onChange: (type: TransactionType) => void
  onRecorrencias?: () => void
}

const TABS: { value: TransactionType; label: string }[] = [
  { value: 'EXPENSE', label: 'Despesa' },
  { value: 'INCOME', label: 'Receita' },
  { value: 'TRANSFER', label: 'Transferência' },
]

export function TransactionTypeTabs({ value, onChange, onRecorrencias }: Props) {
  return (
    <View style={[styles.row, { borderBottomColor: OUTLINE_VARIANT }]}>
      {TABS.map((tab) => {
        const active = tab.value === value
        return (
          <Pressable
            key={tab.value}
            onPress={() => onChange(tab.value)}
            style={[
              styles.tab,
              { borderBottomColor: active ? TYPE_COLORS[tab.value] : 'transparent' },
            ]}
          >
            <Text
              style={[
                styles.label,
                { color: active ? '#e4e1ed' : OUTLINE },
                active && styles.labelActive,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        )
      })}

      {onRecorrencias && (
        <Pressable
          onPress={onRecorrencias}
          style={[styles.tab, { borderBottomColor: 'transparent' }]}
        >
          <Text style={[styles.label, { color: OUTLINE }]}>Recorrências</Text>
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 8,
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    marginBottom: -1,
  },
  label: {
    fontSize: 13,
    fontWeight: '400',
  },
  labelActive: {
    fontWeight: '600',
  },
})
