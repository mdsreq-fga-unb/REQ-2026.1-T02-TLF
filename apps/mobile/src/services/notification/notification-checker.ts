import { notificationTypes } from '@/services/database/models/notification'
import { budgetQueries } from '@/services/database/repository/budget'
import { recurrenceQueries } from '@/services/database/repository/recurrece'
import { transactionQueries } from '@/services/database/repository/transaction'
import { triggerNotification } from './notification.service'

function getTomorrowDay(referenceDate = new Date()): number {
  const tomorrow = new Date(referenceDate)
  tomorrow.setDate(referenceDate.getDate() + 1)
  return tomorrow.getDate()
}

async function checkRecurrenceNotifications(referenceDate = new Date()) {
  const recurrences = await recurrenceQueries.getAll()
  const todayDay = referenceDate.getDate()
  const tomorrowDay = getTomorrowDay(referenceDate)

  for (const recurrence of recurrences) {
    if (!recurrence.isActive) continue

    const chargeDate = recurrence.chargeDate

    if (chargeDate === todayDay) {
      await triggerNotification({
        type: notificationTypes.RECURRENCE_DUE,
        title: 'Recorrência vence hoje',
        description: `"${recurrence.description}" vence hoje.`,
        icon: 'calendar',
        color: 'orange',
        referenceId: recurrence.id,
        referenceType: 'recurrence',
      })
    } else if (chargeDate === tomorrowDay) {
      await triggerNotification({
        type: notificationTypes.RECURRENCE_DUE_WARNING,
        title: 'Recorrência vence amanhã',
        description: `"${recurrence.description}" vence amanhã (dia ${chargeDate}).`,
        icon: 'calendar',
        color: 'yellow',
        referenceId: recurrence.id,
        referenceType: 'recurrence',
      })
    }
  }
}

async function checkBudgetNotifications(referenceDate = new Date()) {
  const [budgets, transactions] = await Promise.all([
    budgetQueries.getAll(),
    transactionQueries.getAll(),
  ])

  const currentMonth = referenceDate.getMonth() + 1
  const currentYear = referenceDate.getFullYear()

  for (const budget of budgets) {
    if (budget.month !== currentMonth || budget.year !== currentYear) continue
    if (budget.amountLimit <= 0) continue

    const spentValue = transactions.reduce((sum, transaction) => {
      if (transaction.type !== 'EXPENSE') return sum
      if (transaction.categoryId !== budget.categoryId) return sum

      const txDate = new Date(transaction.date)
      if (txDate.getMonth() + 1 !== budget.month || txDate.getFullYear() !== budget.year) {
        return sum
      }

      return sum + transaction.amount
    }, 0)

    const spentPercentage = Math.round((spentValue / budget.amountLimit) * 100)

    if (spentPercentage >= 100) {
      await triggerNotification({
        type: notificationTypes.BUDGET_EXCEEDED,
        title: 'Orçamento excedido',
        description: `O orçamento "${budget.name}" atingiu ${spentPercentage}% do limite.`,
        icon: 'alert-circle',
        color: 'red',
        referenceId: budget.id,
        referenceType: 'budget',
      })
    } else if (spentPercentage >= 80) {
      await triggerNotification({
        type: notificationTypes.BUDGET_WARNING,
        title: 'Orçamento quase no limite',
        description: `O orçamento "${budget.name}" está em ${spentPercentage}% do limite.`,
        icon: 'alert-circle',
        color: 'orange',
        referenceId: budget.id,
        referenceType: 'budget',
      })
    }
  }
}

export async function runNotificationChecks(referenceDate = new Date()) {
  await checkRecurrenceNotifications(referenceDate)
  await checkBudgetNotifications(referenceDate)
}
