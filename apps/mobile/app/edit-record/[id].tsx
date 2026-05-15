import { Pressable, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { TransactionForm } from '@/components/finance/transactions/TransactionForm'
import { useThemeColor } from '@/hooks/useThemeColor'
import type { TransactionInitialValues } from '@/hooks/useTransactionForm'
import type { TransactionType } from '@/services/database/queries/transaction'

const VALID_TYPES = new Set<TransactionType>(['EXPENSE', 'INCOME', 'TRANSFER'])

function parseType(raw: string | string[] | undefined): TransactionType {
  const value = Array.isArray(raw) ? raw[0] : raw
  return VALID_TYPES.has(value as TransactionType) ? (value as TransactionType) : 'EXPENSE'
}

function parseAmountCents(raw: string | string[] | undefined): number {
  const value = Array.isArray(raw) ? raw[0] : raw
  const parsed = parseFloat(value ?? '0')
  return Number.isFinite(parsed) ? Math.round(Math.abs(parsed) * 100) : 0
}

function parseString(raw: string | string[] | undefined): string {
  return (Array.isArray(raw) ? raw[0] : raw) ?? ''
}

export default function EditRecordScreen() {
  const theme = useThemeColor()
  const params = useLocalSearchParams()

  const initialValues: TransactionInitialValues = {
    type: parseType(params.type),
    amountCents: parseAmountCents(params.amount),
    categoryId: parseString(params.categoryId),
    notes: parseString(params.description),
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.backRow}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backBtn, { opacity: pressed ? 0.6 : 1 }]}
          hitSlop={12}
        >
          <MaterialIcons name="arrow-back" size={22} color={theme.text} />
        </Pressable>
      </View>

      <TransactionForm
        title="Editar Registro"
        initialValues={initialValues}
        onSuccess={() => router.back()}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
