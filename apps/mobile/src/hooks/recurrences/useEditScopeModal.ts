import { useState } from 'react'

export type EditScope = 'upcoming' | 'all'

export function useEditScopeModal(onConfirm: (scope: EditScope) => void, onCancel: () => void) {
  const [scope, setScope] = useState<EditScope>('upcoming')

  const handleConfirm = () => {
    onConfirm(scope)
    setScope('upcoming')
  }

  const handleCancel = () => {
    setScope('upcoming')
    onCancel()
  }

  return { scope, setScope, handleConfirm, handleCancel }
}
