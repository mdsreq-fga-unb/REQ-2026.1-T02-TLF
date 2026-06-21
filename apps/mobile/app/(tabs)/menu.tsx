import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { notificationTypes } from '@/services/database/models/notification'
import { triggerNotification } from '@/services/notification/notification.service'
import { router } from 'expo-router'
import { ThemedListItem } from '@/components/ui/ThemedListItem'
import { FileText, ChartColumnStacked } from 'lucide-react-native'
import { ThemedHeader } from '@/components/ui/ThemedHeader'
import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedContainer } from '@/components/ui/ThemedContainer'

export default function BudgetsScreen() {
  return (
    <ThemedBackground>
      <ThemedHeader text="Menu" />
      <ThemedContainer variant="transparent" style={{ alignItems: 'flex-start' }}>
        <ThemedText children text="Funções" variant="label" tone="muted" />
        <ThemedListItem
          text="Categorias"
          icon={ChartColumnStacked}
          onPress={() => router.push('/(category)')}
        />
        <ThemedListItem
          text="Notificações"
          icon={FileText}
          onPress={() => router.push('/notifications')}
        />
        <ThemedListItem
          text="Criar notificações"
          icon={FileText}
          onPress={() =>
            triggerNotification({
              type: notificationTypes.BUDGET_WARNING,
              title: 'O seu orçamento pode ser excedido em breve',
              description: 'Verifique as suas transações e ajuste o seu orçamento',
              icon: 'alert-circle',
              color: 'red',
              referenceId: Math.random().toString(36).substring(2, 15),
              referenceType: 'budget',
            })
          }
        />
        <ThemedListItem text="item 4" />
      </ThemedContainer>
    </ThemedBackground>
  )
}
