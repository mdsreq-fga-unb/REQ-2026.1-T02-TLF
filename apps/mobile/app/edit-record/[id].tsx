import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeft } from 'lucide-react-native'
import { TransactionForm } from '@/components/finance/transactions/TransactionForm'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useEditRecordScreen } from '@/hooks/records/useEditRecordScreen'

export default function EditRecordScreen() {
  const theme = useThemeColor()
  const { title, mode, loading, notFound, initialValues, handleBack, handleSuccess } =
    useEditRecordScreen()

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.backRow}>
        <Pressable
          onPress={handleBack}
          style={({ pressed }) => [styles.backBtn, { opacity: pressed ? 0.6 : 1 }]}
          hitSlop={12}
        >
          <ArrowLeft size={22} color={theme.foreground} />
        </Pressable>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={theme.foreground} />
        </View>
      ) : notFound || !initialValues ? (
        <View style={styles.centered}>
          <ThemedText text="Registro não encontrado" variant="body" />
        </View>
      ) : (
        <TransactionForm
          title={title}
          mode={mode}
          initialValues={initialValues}
          onSuccess={handleSuccess}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backRow: {
    paddingHorizontal: 20,
    paddingTop: 8,
    alignItems: 'flex-start',
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
