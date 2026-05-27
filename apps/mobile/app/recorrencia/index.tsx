import { useCallback, useMemo, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { router, useFocusEffect } from 'expo-router'
import { Background } from '@/components/ui/Background'
import { ScrollArea } from '@/components/ui/ScrollArea'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { SuccessToast } from '@/components/ui/SuccessToast'
import { useThemeColor } from '@/hooks/useThemeColor'
import { RecurrenceSummaryCard } from '@/components/finance/recurrences/RecurrenceSummaryCard'
import { RecurrencesList } from '@/components/finance/recurrences/RecurrencesList'
import { ConfirmacoesPendentes } from '@/components/finance/recurrences/ConfirmacoesPendentes'
import { mockRecurrences } from '@/components/finance/recurrences/recurrences-data'
import { consumePendingDeleteId } from '@/components/finance/recurrences/recurrences-store'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

export default function RecorrenciasScreen() {
  const theme = useThemeColor()
  const [recurrences, setRecurrences] = useState(mockRecurrences)
  const [toast, setToast] = useState<string | null>(null)
  const [confirmedIds, setConfirmedIds] = useState<string[]>([])
  const [skippedIds, setSkippedIds] = useState<string[]>([])

  useFocusEffect(
    useCallback(() => {
      const id = consumePendingDeleteId()
      if (id) {
        setRecurrences((prev) => prev.filter((r) => r.id !== id))
        setToast('Recorrência excluída com sucesso.')
      }
    }, []),
  )

  const totalMonthly = useMemo(
    () =>
      recurrences
        .filter((r) => r.isActive && r.frequency === 'MONTHLY')
        .reduce((sum, r) => (r.type === 'EXPENSE' ? sum + r.amount : sum - r.amount), 0),
    [recurrences],
  )

  const activeCount = useMemo(() => recurrences.filter((r) => r.isActive).length, [recurrences])

  const handleToggleActive = (id: string, isActive: boolean) => {
    setRecurrences((prev) => prev.map((r) => (r.id === id ? { ...r, isActive } : r)))
  }

  const handleConfirmRecurrence = (id: string) => {
    setConfirmedIds((prev) => [...prev, id])
    setToast('Transação registrada com sucesso.')
  }

  const handleSkipRecurrence = (id: string) => {
    setSkippedIds((prev) => [...prev, id])
  }

  const handleUndoRecurrence = (id: string) => {
    setConfirmedIds((prev) => prev.filter((cid) => cid !== id))
    setSkippedIds((prev) => prev.filter((sid) => sid !== id))
  }

  return (
    <Background>
      <ScrollArea style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={8}
            style={({ pressed }) => [styles.iconBtn, { opacity: pressed ? 0.6 : 1 }]}
          >
            <MaterialIcons name="arrow-back" size={22} color={theme.foreground} />
          </Pressable>
          <Text style={[styles.title, { color: theme.foreground }]}>Recorrências</Text>
          <View style={[styles.iconBtn, { backgroundColor: theme.surfaceMuted }]}>
            <MaterialIcons name="notifications-none" size={22} color={theme.foreground} />
          </View>
        </View>

        <RecurrenceSummaryCard totalMonthly={totalMonthly} activeCount={activeCount} />

        <ConfirmacoesPendentes
          recurrences={recurrences}
          confirmedIds={confirmedIds}
          skippedIds={skippedIds}
          onConfirm={handleConfirmRecurrence}
          onSkip={handleSkipRecurrence}
          onUndo={handleUndoRecurrence}
        />

        <SectionDivider />

        <RecurrencesList recurrences={recurrences} onToggleActive={handleToggleActive} />
      </ScrollArea>

      <Pressable
        onPress={() => router.push('/recorrencia/nova')}
        style={({ pressed }) => [
          styles.fab,
          { backgroundColor: theme.primary, opacity: pressed ? 0.85 : 1 },
        ]}
      >
        <MaterialIcons name="add" size={28} color={theme.onPrimary} />
      </Pressable>

      <SuccessToast visible={toast !== null} message={toast ?? ''} onHide={() => setToast(null)} />
    </Background>
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
    paddingBottom: 100,
    gap: 14,
    alignItems: 'stretch',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
})
