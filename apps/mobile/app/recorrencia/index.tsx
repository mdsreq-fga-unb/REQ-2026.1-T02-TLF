import { Pressable, StyleSheet, View } from 'react-native'
import { router } from 'expo-router'
import { ArrowLeft, Bell, Plus } from 'lucide-react-native'
import { ConfirmacoesPendentes } from '@/components/finance/recurrences/ConfirmacoesPendentes'
import { RecurrenceSummaryCard } from '@/components/finance/recurrences/RecurrenceSummaryCard'
import { RecurrencesList } from '@/components/finance/recurrences/RecurrencesList'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { SuccessToast } from '@/components/ui/SuccessToast'
import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { ThemedScrollArea } from '@/components/ui/ThemedScrollArea'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useRecorrenciasScreen } from '@/hooks/recurrences/useRecorrenciasScreen'

export default function RecorrenciasScreen() {
  const theme = useThemeColor()
  const {
    recurrences,
    toast,
    setToast,
    confirmedIds,
    skippedIds,
    totalMonthly,
    activeCount,
    handleToggleActive,
    handleConfirmRecurrence,
    handleSkipRecurrence,
    handleUndoRecurrence,
  } = useRecorrenciasScreen()

  return (
    <ThemedBackground>
      <ThemedScrollArea
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingHorizontal: 8 }]}
      >
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={8}
            style={({ pressed }) => [styles.iconBtn, { opacity: pressed ? 0.6 : 1 }]}
          >
            <ArrowLeft size={22} color={theme.foreground} />
          </Pressable>
          <ThemedText text="Recorrências" style={styles.title} />
          <View style={[styles.iconBtn, { backgroundColor: theme.surfaceMuted }]}>
            <Bell size={22} color={theme.foreground} />
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
      </ThemedScrollArea>

      <Pressable
        onPress={() => router.push('/recorrencia/nova')}
        style={({ pressed }) => [
          styles.fab,
          { backgroundColor: theme.primary, opacity: pressed ? 0.85 : 1 },
        ]}
      >
        <Plus size={28} color={theme.onPrimary} />
      </Pressable>

      <SuccessToast visible={toast !== null} message={toast ?? ''} onHide={() => setToast(null)} />
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
    paddingBottom: 100,
    gap: 14,
    alignItems: 'stretch',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
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
