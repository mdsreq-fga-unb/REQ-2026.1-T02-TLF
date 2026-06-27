import { BudgetItem } from '@/components/finance/budget/BudgetItem'
import { CategoryDistribution } from '@/components/finance/records/CategoryDistribution'
import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { ThemedButton } from '@/components/ui/ThemedButton'
import { ThemedContainer } from '@/components/ui/ThemedContainer'
import { ThemedHeader } from '@/components/ui/ThemedHeader'
import { ThemedScrollArea } from '@/components/ui/ThemedScrollArea'
import { ThemedText } from '@/components/ui/ThemedText'
import { useBudgetScreen } from '@/hooks/budget/useBudgetScreen'
import { useThemeColor } from '@/hooks/useThemeColor'
import { database } from '@/services/database'
import { Category } from '@/services/database/models/category'
import { Transaction } from '@/services/database/models/transaction'
import { formatCurrency } from '@/utils/formatters'
import { resolveCategoryColor } from '@/utils/records/categoryColors'
import { Q } from '@nozbe/watermelondb'
import { withObservables } from '@nozbe/watermelondb/react'
import { runNotificationChecks } from '@/services/notification/notification-checker'
import { router, useFocusEffect } from 'expo-router'
import { useCallback, useMemo } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Pie, PolarChart } from 'victory-native'

type HomeProps = {
  transactions: Transaction[]
  categories: Category[]
}

type ChartItem = {
  label: string
  value: number
  color: string
}

const formatAmount = (value: number) => formatCurrency(value)

function HomeView({ transactions, categories }: HomeProps) {
  const colors = useThemeColor()
  const { fetchBudgets, budgets } = useBudgetScreen()

  useFocusEffect(
    useCallback(() => {
      fetchBudgets()
      void runNotificationChecks()
    }, [fetchBudgets]),
  )

  const categoryById = useMemo(() => {
    return new Map(
      categories.map((category) => [
        category.id,
        { name: category.name || 'Sem categoria', color: category.color },
      ]),
    )
  }, [categories])

  const budget = useMemo(() => {
    const item = budgets[0]
    if (!item) return null

    const spentValue = transactions.reduce((sum, transaction) => {
      if (transaction.type !== 'EXPENSE') return sum
      if (transaction.categoryId !== item.categoryId) return sum
      const txDate = new Date(transaction.date)
      if (txDate.getMonth() + 1 !== item.month || txDate.getFullYear() !== item.year) return sum
      return sum + transaction.amount
    }, 0)

    return {
      ...item,
      spentValue,
      remainingValue: item.amountLimit - spentValue,
      spentPercentage: item.amountLimit > 0 ? Math.round((spentValue / item.amountLimit) * 100) : 0,
    }
  }, [budgets, transactions])

  const { balance, spentTotal, chartData } = useMemo(() => {
    const totals = new Map<string, ChartItem>()
    let income = 0
    let expense = 0

    transactions.forEach((transaction) => {
      const amount = transaction.amount / 100

      if (transaction.type === 'INCOME') {
        income += amount
        return
      }

      if (transaction.type !== 'EXPENSE') {
        return
      }

      expense += amount

      const categoryId = transaction.categoryId || 'Sem categoria'
      const category = categoryById.get(categoryId)
      const label = category?.name ?? 'Sem categoria'
      const current = totals.get(categoryId)
      const color = category?.color ?? resolveCategoryColor(label, totals.size)

      totals.set(categoryId, {
        label,
        value: (current?.value ?? 0) + amount,
        color,
      })
    })

    return {
      balance: income - expense,
      spentTotal: expense,
      chartData: Array.from(totals.values()),
    }
  }, [categoryById, transactions])

  return (
    <ThemedBackground style={{ padding: 0 }}>
      <ThemedScrollArea style={styles.scroll} contentContainerStyle={styles.content}>
        <ThemedHeader />
        <ThemedContainer style={{ marginTop: 70, alignItems: 'flex-start', gap: 10 }}>
          <ThemedText text="Saldo na conta" variant="label" tone="muted" />
          <ThemedText
            text={formatAmount(balance)}
            variant="display"
            tone={balance < 0 ? 'destructive' : 'positive'}
            style={{ textAlign: 'left' }}
          />
        </ThemedContainer>

        {budget ? (
          <BudgetItem
            id={budget.id}
            categoryId={budget.categoryId}
            categoryColor={categoryById.get(budget.categoryId)?.color}
            amountLimit={budget.amountLimit}
            name={budget.name}
            month={budget.month}
            year={budget.year}
            spentValue={budget.spentValue}
            remainingValue={budget.remainingValue}
            spentPercentage={budget.spentPercentage}
            onDelete={() => fetchBudgets()}
            mainBudget={true}
          />
        ) : (
          <ThemedContainer>
            <ThemedContainer variant="transparent" style={{ alignItems: 'flex-start', gap: 10 }}>
              <ThemedText text="Orçamentos" variant="label" />
              <ThemedText
                text="Nenhum orçamento criado ainda"
                variant="bodyLarge"
                tone="muted"
                style={{ textAlign: 'left' }}
              />
            </ThemedContainer>
            <ThemedButton title="Criar orçamentos" onPress={() => router.push('/(budget)/')} />
          </ThemedContainer>
        )}

        <ThemedContainer style={{ height: 400, width: '100%', justifyContent: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <ThemedText text="Estatisticas" variant="bodyLarge" style={{ textAlign: 'left' }} />
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => router.push('/records')}
              style={[styles.button, { backgroundColor: colors.primary }]}
            >
              <ThemedText text="Ver mais" variant="button" style={{ color: colors.onPrimary }} />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, width: '100%' }}>
            {chartData.length > 0 ? (
              <PolarChart data={chartData} labelKey="label" valueKey="value" colorKey="color">
                <Pie.Chart innerRadius="80%">
                  {() => (
                    <>
                      <Pie.Slice strokeCap="round" />
                      <Pie.SliceAngularInset
                        angularInset={{
                          angularStrokeWidth: 5,
                          angularStrokeColor: colors.background,
                        }}
                      />
                    </>
                  )}
                </Pie.Chart>
              </PolarChart>
            ) : (
              <View style={styles.emptyChartState}>
                <ThemedText text="Nenhuma despesa registrada" variant="bodyLarge" tone="muted" />
              </View>
            )}

            {transactions[0] && (
              <View
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <ThemedText text="Total Gasto" variant="label" tone="muted" />
                  <ThemedText
                    text={formatAmount(spentTotal)}
                    variant="headline"
                    style={{ fontWeight: 'bold', marginTop: 2 }}
                  />
                </View>
              </View>
            )}
          </View>
        </ThemedContainer>

        <CategoryDistribution transactions={transactions} categories={categories} />
      </ThemedScrollArea>
    </ThemedBackground>
  )
}

const Home = withObservables([], () => {
  const transactionsCollection = database.get<Transaction>('transactions')
  const categoriesCollection = database.get<Category>('categories')

  return {
    transactions: transactionsCollection.query(Q.sortBy('created_at', 'desc')),
    categories: categoriesCollection.query(),
  }
})(HomeView)

export default Home

const styles = StyleSheet.create({
  scroll: {
    alignSelf: 'stretch',
    width: '100%',
  },
  content: {
    paddingHorizontal: 8,
    paddingTop: 48,
    paddingBottom: 20,
    gap: 20,
    alignItems: 'stretch',
    width: '100%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 5,
    height: 35,
  },
  emptyChartState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
