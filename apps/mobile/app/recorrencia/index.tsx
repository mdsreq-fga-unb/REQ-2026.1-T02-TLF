import { Pressable, View } from 'react-native'
import { router } from 'expo-router'
import { ArrowLeft, Bell, Plus } from 'lucide-react-native'
import { Background } from '@/components/ui/Background'
import { ScrollArea } from '@/components/ui/ScrollArea'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { SuccessToast } from '@/components/ui/SuccessToast'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useRecorrenciasScreen } from '@/hooks/useRecorrenciasScreen'
import { RecurrenceSummaryCard } from '@/components/finance/recurrences/RecurrenceSummaryCard'
import { RecurrencesList } from '@/components/finance/recurrences/RecurrencesList'
import { ConfirmacoesPendentes } from '@/components/finance/recurrences/ConfirmacoesPendentes'
import { indexStyles as styles } from '@/styles/recorrencia.style'

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
    <Background>
      <ScrollArea style={styles.scroll} contentContainerStyle={styles.content}>
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
      </ScrollArea>

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
    </Background>
  )
}
