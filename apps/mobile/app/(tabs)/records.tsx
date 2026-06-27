import { RecordsHeader } from '@/components/finance/records/RecordsHeader'
import { RecordsSearch } from '@/components/finance/records/RecordsSearch'
import { RecordsSummary } from '@/components/finance/records/RecordsSummary'
import { TransactionsFilters } from '@/components/finance/records/TransactionsFilters'
import { TransactionsList } from '@/components/finance/records/TransactionsList'
import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { ThemedOverlayAlert } from '@/components/ui/ThemedOverlayAlert'
import { ThemedScrollArea } from '@/components/ui/ThemedScrollArea'
import { ThemedText } from '@/components/ui/ThemedText'
import { useRecordsScreen } from '@/hooks/records/useRecordsScreen'
import { spacing } from '@/utils/dimensions'
import { StyleSheet } from 'react-native'

export default function RecordsScreen() {
  const {
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    typeFilter,
    setTypeFilter,
    categoryOptions,
    transactionTypeOptions,
    filteredTransactions,
    summaryData,
    isLoading,
    error,
    handleEdit,
    handleDelete,
    alert,
    dismissAlert,
  } = useRecordsScreen()

  return (
    <ThemedBackground>
      <ThemedScrollArea contentContainerStyle={styles.content}>
        <RecordsHeader title="Histórico" showPeriod={false} />
        <RecordsSearch value={searchQuery} onChangeText={setSearchQuery} />
        <RecordsSummary summary={summaryData} />
        <TransactionsFilters
          categories={categoryOptions}
          selectedCategory={categoryFilter}
          onSelectCategory={setCategoryFilter}
          types={transactionTypeOptions}
          selectedType={typeFilter}
          onSelectType={setTypeFilter}
        />
        <TransactionsList
          transactions={filteredTransactions}
          isLoading={isLoading}
          error={error}
          onDeleteTransaction={handleDelete}
          onEditTransaction={handleEdit}
        />
      </ThemedScrollArea>
      <ThemedOverlayAlert
        visible={alert != null}
        onRequestClose={dismissAlert}
        message={alert?.message ?? ''}
        actions={alert?.actions ?? []}
      >
        {alert?.title ? (
          <ThemedText
            variant="headline"
            text={alert.title}
            style={{ textAlign: 'center', width: '100%' }}
          />
        ) : null}
      </ThemedOverlayAlert>
    </ThemedBackground>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 18,
    paddingBottom: 28,
    gap: spacing.sm + 2,
    alignItems: 'stretch',
  },
})
