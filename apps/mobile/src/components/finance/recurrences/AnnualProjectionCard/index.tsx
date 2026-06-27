import { View } from 'react-native'
import { BarChart3 } from 'lucide-react-native'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { formatCurrency } from '@/utils/formatters'
import { styles } from './style'

type Props = {
  annualProjection: number
  amountColor: string
  isExpense: boolean
}

export function AnnualProjectionCard({ annualProjection, amountColor, isExpense }: Props) {
  const theme = useThemeColor()

  return (
    <View style={[styles.projectionCard, { backgroundColor: theme.surface }]}>
      <View style={[styles.projectionIconWrap, { backgroundColor: `${theme.primary}22` }]}>
        <BarChart3 size={26} color={theme.primary} />
      </View>
      <View style={styles.projectionBody}>
        <ThemedText tone="muted" style={styles.projectionLabel} text="PROJEÇÃO ANUAL" />
        <ThemedText
          text={formatCurrency(annualProjection)}
          variant="title"
          style={[styles.projectionValue, { color: amountColor }]}
        />
        <ThemedText
          tone="muted"
          style={styles.projectionSub}
          text={isExpense ? 'Custo total estimado em 12 meses' : 'Receita estimada em 12 meses'}
        />
      </View>
    </View>
  )
}
