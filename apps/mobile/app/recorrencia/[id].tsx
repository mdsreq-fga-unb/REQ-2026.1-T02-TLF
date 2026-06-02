import { Pressable, StyleSheet, View } from 'react-native'
import { router } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'
import { AnnualProjectionCard } from '@/components/finance/recurrences/AnnualProjectionCard'
import { DeleteRecurrenceModal } from '@/components/finance/recurrences/DeleteRecurrenceModal'
import { PaymentHistoryTimeline } from '@/components/finance/recurrences/PaymentHistoryTimeline'
import { RecurrenceDetailsCard } from '@/components/finance/recurrences/RecurrenceDetailsCard'
import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { ThemedScrollArea } from '@/components/ui/ThemedScrollArea'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useRecorrenciaDetails } from '@/hooks/recurrences/useRecorrenciaDetails'

export default function RecorrenciaDetailsScreen() {
  const theme = useThemeColor()
  const {
    description,
    amount,
    dueDay,
    isActive,
    isExpense,
    accountName,
    frequencyLabel,
    typeLabel,
    icon,
    iconColor,
    history,
    annualProjection,
    nextBillingLabel,
    intFormatted,
    decPart,
    recurrenceForModal,
    showDeleteModal,
    setShowDeleteModal,
    handleEdit,
    handleDeleteConfirm,
  } = useRecorrenciaDetails()

  const amountColor = isExpense ? theme.expense : theme.income
  const statusColor = isActive ? theme.income : theme.mutedForeground

  return (
    <ThemedBackground>
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.headerBtn, { opacity: pressed ? 0.6 : 1 }]}
          hitSlop={8}
        >
          <ArrowLeft size={24} color={theme.foreground} />
        </Pressable>
        <ThemedText style={styles.headerTitle} text="Detalhes da Recorrência" />
        <View style={styles.headerBtn} />
      </View>

      <ThemedScrollArea contentContainerStyle={styles.content}>
        <RecurrenceDetailsCard
          description={description}
          typeLabel={typeLabel}
          icon={icon}
          iconColor={iconColor}
          intFormatted={intFormatted}
          decPart={decPart}
          amountColor={amountColor}
          isActive={isActive}
          statusColor={statusColor}
          accountName={accountName}
          nextBillingLabel={nextBillingLabel}
          frequencyLabel={frequencyLabel}
          onEdit={handleEdit}
          onDelete={() => setShowDeleteModal(true)}
        />

        <PaymentHistoryTimeline history={history} dueDay={dueDay} amount={amount} />

        <AnnualProjectionCard
          annualProjection={annualProjection}
          amountColor={amountColor}
          isExpense={isExpense}
        />
      </ThemedScrollArea>

      <DeleteRecurrenceModal
        visible={showDeleteModal}
        recurrence={recurrenceForModal}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteModal(false)}
      />
    </ThemedBackground>
  )
}

const styles = StyleSheet.create({
  header: {
    alignSelf: 'stretch',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  headerBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
    gap: 16,
    alignItems: 'stretch',
    width: '100%',
  },
})
