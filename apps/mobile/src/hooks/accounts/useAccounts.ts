import { useEffect, useState } from 'react'
import { observeAccounts } from '@/services/database/queries/account'
import type { Account, AccountType } from '@/services/database/models/account'
import type { FormAccount } from '@/utils/transactionForm/data'
import type { IconKey } from '@/utils/icons'

const ACCOUNT_TYPE_ICON: Record<AccountType, IconKey> = {
  CASH: 'banknote',
  CHECKING: 'landmark',
  SAVINGS: 'landmark',
  CREDIT_CARD: 'credit-card',
}

const toFormAccount = (account: Account): FormAccount => ({
  id: account.id,
  label: account.name,
  icon: ACCOUNT_TYPE_ICON[account.type] ?? 'landmark',
})

export function useAccounts() {
  const [accounts, setAccounts] = useState<FormAccount[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const subscription = observeAccounts().subscribe((rows) => {
      setAccounts(rows.map(toFormAccount))
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  return { accounts, loading }
}
