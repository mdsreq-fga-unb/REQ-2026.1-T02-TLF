import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { ThemedButton } from '@/components/ui/ThemedButton'
import { notificationTypes } from '@/services/database/models/notification'
import { triggerNotification } from '@/services/notification/notification.service'
import { router } from 'expo-router'

export default function BudgetsScreen() {
  return (
    <ThemedBackground>
      <ThemedButton title="Notificações" onPress={() => router.push('/notifications')} />
      <ThemedButton
        title="Criar notificação"
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
    </ThemedBackground>
  )
}
