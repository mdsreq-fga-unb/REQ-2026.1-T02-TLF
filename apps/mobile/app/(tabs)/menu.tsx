import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { ThemedListItem } from '@/components/ui/ThemedListItem'
import { FileText, ChartColumnStacked } from 'lucide-react-native'
import { router } from 'expo-router'
import { ThemedSimpleHeader } from '@/components/ui/ThemedSimpleHeader'
import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedContainer } from '@/components/ui/ThemedContainer'

export default function BudgetsScreen() {
  return (
    <ThemedBackground>
      <ThemedSimpleHeader text="Menu" />
      <ThemedContainer variant="transparent" style={{ alignItems: 'flex-start' }}>
        <ThemedText children text="Funções" variant="label" tone="muted" />
        <ThemedListItem
          text="Categorias"
          icon={ChartColumnStacked}
          onPress={() => router.push('/(category)')}
        />
        <ThemedListItem text="item 2" icon={FileText} />
        <ThemedListItem text="item 3" />
        <ThemedListItem text="item 4" />
      </ThemedContainer>
    </ThemedBackground>
  )
}
