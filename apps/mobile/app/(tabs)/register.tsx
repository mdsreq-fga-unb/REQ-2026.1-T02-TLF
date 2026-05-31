import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemeColor } from '@/hooks/useThemeColor'
import { TransactionForm } from '@/components/finance/transactions/TransactionForm'

export default function RegistroScreen() {
  const theme = useThemeColor()

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <TransactionForm />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
