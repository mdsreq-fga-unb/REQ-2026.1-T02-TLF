/* eslint-disable @typescript-eslint/no-unused-vars */
import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedContainer } from '@/components/ui/ThemedContainer'
import { ThemedHeader } from '@/components/ui/ThemedHeader'
import { BudgetItem } from '@/components/finance/budget/BudgetItem'
import { useBudgetScreen } from '@/hooks/budget/useBudgetScreen'
import { router, useFocusEffect } from 'expo-router'
import { useCallback } from 'react'
import { ThemedButton } from '@/components/ui/ThemedButton'
import { TouchableOpacity, View } from 'react-native'
import { Pie, PolarChart } from 'victory-native'
import { StyleSheet } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ThemedScrollArea } from '@/components/ui/ThemedScrollArea'

export default function Home() {
  const colors = useThemeColor()
  const { fetchBudgets, budgets } = useBudgetScreen()
  useFocusEffect(
    useCallback(() => {
      fetchBudgets()
    }, []),
  )
  const budget = budgets[0]
  const Data = [
    { label: 'Food', value: 3430, color: '#FFD166' },
    { label: 'Health', value: 560, color: '#FF9F7A' },
    { label: 'Transport', value: 210, color: '#7FFFD4' },
    { label: 'Blue', value: 700, color: '#4DB8FF' },
    { label: 'Pink', value: 450, color: '#FF77FF' },
  ]

  return (
    <ThemedBackground style={{ padding: 0 }}>
      <ThemedScrollArea style={styles.scroll} contentContainerStyle={styles.content}>
        <ThemedHeader />
        <ThemedContainer style={{ marginTop: 70, alignItems: 'flex-start', gap: 10 }}>
          <ThemedText text="Saldo na conta" variant="label" tone="muted" />
          {/* TODO: Adaptar quando registro for integrado */}
          <ThemedText text="R$ 3.944,75" variant="display" style={{ textAlign: 'left' }} />
        </ThemedContainer>
        {budget ? (
          <BudgetItem
            id={budget.id}
            categoryId={budget.categoryId}
            categoryColor={budget.category?.color}
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
              {/* TODO: Adaptar quando registro for integrado */}
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
            <PolarChart data={Data} labelKey={'label'} valueKey={'value'} colorKey={'color'}>
              <Pie.Chart innerRadius={'80%'}>
                {({ slice }) => {
                  return (
                    <>
                      <Pie.Slice strokeCap="round" />
                      <Pie.SliceAngularInset
                        angularInset={{
                          angularStrokeWidth: 5,
                          angularStrokeColor: colors.background,
                        }}
                      />
                    </>
                  )
                }}
              </Pie.Chart>
            </PolarChart>
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
                  text="R$ 2.355,75"
                  variant="headline"
                  style={{ fontWeight: 'bold', marginTop: 2 }}
                />
              </View>
            </View>
          </View>
        </ThemedContainer>
      </ThemedScrollArea>
    </ThemedBackground>
  )
}

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
})
