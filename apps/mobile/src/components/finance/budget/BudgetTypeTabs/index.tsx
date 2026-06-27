import { View, Pressable } from 'react-native'
import { BudgetType } from 'types/types'
import { styles } from './style'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'

type props = {
  value: BudgetType
  onChange: (type: BudgetType) => void
}

const TABS: { value: BudgetType; label: string }[] = [
  { value: 'BUDGET', label: 'orçamento' },
  { value: 'GOAL', label: 'meta' },
]

export function BudgetTypeTabs({ value, onChange }: props) {
  const theme = useThemeColor()
  return (
    <View style={[styles.row, { borderBottomColor: theme.border }]}>
      {TABS.map((tab) => {
        const active = tab.value === value
        return (
          <Pressable
            key={tab.value}
            onPress={() => onChange(tab.value)}
            style={[styles.tab, { borderBottomColor: active ? theme.primary : 'transparent' }]}
          >
            <ThemedText
              style={[
                styles.label,
                { color: active ? '#e4e1ed' : theme.foreground },
                active && styles.labelActive,
              ]}
              text={''}
            >
              {tab.label}
            </ThemedText>
          </Pressable>
        )
      })}
    </View>
  )
}
