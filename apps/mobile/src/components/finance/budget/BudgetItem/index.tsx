import { ThemedContainer } from '@/components/ui/ThemedContainer'
import { ThemedText } from '@/components/ui/ThemedText'
import { Pressable, TouchableOpacity, View } from 'react-native'
import Fontisto from '@expo/vector-icons/Fontisto'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { styles } from './style'
import { router } from 'expo-router'
import { resolveTextTone } from '@/utils/textTone'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ProgressBar } from '../ProgressBar'
import { formatCurrency } from '@/utils/formatters'
import { useState } from 'react'
import { budgetQueries } from '@/services/database/repository/budget'
import { syncDatabase } from '@/services/database/sync'
import { ThemedOverlayAlert } from '@/components/ui/ThemedOverlayAlert'
import { useBudgetScreen } from '@/hooks/budget/useBudgetScreen'
import { useColors } from '@/hooks/useColors'

type props = {
  id: string
  categoryId: string
  categoryColor?: string
  amountLimit: number
  name: string
  month: number
  year: number
  spentValue?: number
  remainingValue?: number
  spentPercentage?: number
  mainBudget?: boolean
  onDelete?: (id: string) => void
}

export function BudgetItem({
  id,
  categoryColor,
  amountLimit,
  name,
  spentValue = 0,
  remainingValue,
  spentPercentage,
  mainBudget = false,
  onDelete,
}: props) {
  const colors = useThemeColor()
  const { withOpacity } = useColors()
  const totalValue = amountLimit / 100
  const spentAmount = spentValue / 100
  const calculatedRemainingValue = remainingValue ?? amountLimit - spentValue
  const remainingAmount = calculatedRemainingValue / 100
  const calculatedPercentage =
    spentPercentage ?? (amountLimit > 0 ? Math.round((spentValue / amountLimit) * 100) : 0)
  const safePercentage = Math.min(100, calculatedPercentage)
  const formatedTotalValue = formatCurrency(totalValue)
  const formatedSpentValue = formatCurrency(spentAmount)
  const formatedRemainingValue = formatCurrency(remainingAmount)
  const [showAction, setShowAction] = useState(false)
  const useBudget = useBudgetScreen()

  const budgetColor = categoryColor ?? colors.primary

  return (
    <ThemedContainer style={{ padding: 20 }}>
      <View style={styles.container}>
        <ThemedText children text={name} variant="title" />
        <View style={styles.actionContainer}>
          {mainBudget ? (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => router.push('/(budget)/')}
              style={[styles.mainButton, { backgroundColor: colors.primary }]}
            >
              <ThemedText text="Orçamentos" variant="button" style={{ color: colors.onPrimary }} />
            </TouchableOpacity>
          ) : (
            <Pressable
              onPress={() => {
                setShowAction((prev) => !prev)
              }}
              style={styles.iconButton}
            >
              <Fontisto name="more-v-a" size={24} color={resolveTextTone(colors, 'muted')} />
            </Pressable>
          )}
          {showAction ? (
            <View style={[styles.dropdownMenu, { backgroundColor: colors.surfaceMuted }]}>
              <Pressable
                onPress={() => {
                  router.push(`/(budget)/${id}`)
                  setShowAction(false)
                }}
                style={styles.menuItem}
              >
                <ThemedText text="Editar" />
              </Pressable>

              <SectionDivider />

              <Pressable
                onPress={() =>
                  useBudget.setFeedbackMessage('Você tem certeza que deseja excluir esse item?')
                }
                style={styles.menuItem}
              >
                <ThemedText text="Excluir" />
              </Pressable>
            </View>
          ) : null}
        </View>
      </View>

      <View style={styles.container}>
        <ThemedText children variant="display" text={`${formatedTotalValue}`} />
        <ThemedText children variant="display" text={`${safePercentage}%`} />
      </View>

      <ProgressBar
        percentage={safePercentage}
        backColor={withOpacity(budgetColor, 0.17)}
        fillColor={budgetColor}
      />

      <View style={styles.container}>
        {remainingAmount > 0 ? (
          <ThemedText children variant="label" tone="muted" text={`${formatedSpentValue} gastos`} />
        ) : null}
        <ThemedText
          children
          variant="label"
          tone={remainingAmount > 0 ? 'default' : 'warning'}
          text={`${formatedRemainingValue} ${remainingAmount > 0 ? 'sobrando' : 'além do limite'}`}
        />
      </View>

      <ThemedOverlayAlert
        visible={useBudget.feedbackMessage != null}
        onRequestClose={useBudget.dismissFeedback}
        message={useBudget.feedbackMessage ?? ''}
        actions={[
          {
            label: 'Cancelar',
            onPress: useBudget.dismissFeedback,
          },
          {
            label: 'Confirmar',
            onPress: async () => {
              try {
                await budgetQueries.delete(id)
                void syncDatabase()
                useBudget.dismissFeedback()
                onDelete?.(id)
              } catch (deleteError) {
                console.error('Erro ao excluir orçamento:', deleteError)
                useBudget.setFeedbackMessage(
                  'Não foi possível excluir o orçamento. Tente novamente.',
                )
              }
            },
          },
        ]}
      >
        <ThemedText children text="" />
      </ThemedOverlayAlert>
    </ThemedContainer>
  )
}
