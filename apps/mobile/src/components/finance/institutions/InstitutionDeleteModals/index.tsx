import { ThemedSheetModal } from '@/components/ui/ThemedSheetModal'

type Props = {
  confirmVisible: boolean
  onConfirmDelete: () => void
  onCancelDelete: () => void
  blockedVisible: boolean
  onViewAccounts: () => void
  onDismissBlocked: () => void
}

export function InstitutionDeleteModals({
  confirmVisible,
  onConfirmDelete,
  onCancelDelete,
  blockedVisible,
  onViewAccounts,
  onDismissBlocked,
}: Props) {
  return (
    <>
      <ThemedSheetModal
        visible={confirmVisible}
        onRequestClose={onCancelDelete}
        icon="trash"
        iconTone="destructive"
        title="Excluir instituição"
        message="Esta ação não pode ser desfeita. Deseja realmente excluir esta instituição?"
        actions={[
          {
            label: 'Excluir',
            onPress: onConfirmDelete,
            fillTone: 'destructive',
            textTone: 'onPrimary',
          },
          { label: 'Cancelar', onPress: onCancelDelete, outlined: true },
        ]}
      />

      <ThemedSheetModal
        visible={blockedVisible}
        onRequestClose={onDismissBlocked}
        icon="triangle-alert"
        iconTone="destructive"
        title="Não é possível excluir"
        message="Esta instituição possui contas vinculadas ativas. Para excluí-la, você deve primeiro remover ou transferir as contas associadas."
        actions={[
          { label: 'Ver Contas', onPress: onViewAccounts },
          { label: 'Entendido', onPress: onDismissBlocked, outlined: true },
        ]}
      />
    </>
  )
}
