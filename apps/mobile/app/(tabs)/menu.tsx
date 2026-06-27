import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { ThemedListItem } from '@/components/ui/ThemedListItem'
import { ThemedSimpleHeader } from '@/components/ui/ThemedSimpleHeader'
import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedContainer } from '@/components/ui/ThemedContainer'
import { ThemedOverlayAlert } from '@/components/ui/ThemedOverlayAlert'
import { deleteAccountAndSignOut, signOut } from '@/services/api/auth-session'
import { router } from 'expo-router'
import { ChartColumnStacked, FileText, LogOut, Trash2 } from 'lucide-react-native'
import { useCallback, useState } from 'react'

export default function MenuScreen() {
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)

  const handleLogout = useCallback(async () => {
    if (isSigningOut) return

    setIsSigningOut(true)
    try {
      await signOut()
      router.replace('/(auth)/login')
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Não foi possível sair. Tente novamente.'
      setFeedbackMessage(message)
    } finally {
      setIsSigningOut(false)
    }
  }, [isSigningOut])

  const handleDeleteAccount = useCallback(async () => {
    if (isDeleting) return

    setIsDeleting(true)
    try {
      await deleteAccountAndSignOut()
      setShowDeleteConfirm(false)
      router.replace('/(auth)/login')
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Não foi possível excluir a conta. Tente novamente.'
      setFeedbackMessage(message)
    } finally {
      setIsDeleting(false)
    }
  }, [isDeleting])

  return (
    <ThemedBackground>
      <ThemedSimpleHeader text="Menu" />
      <ThemedContainer variant="transparent" style={{ alignItems: 'flex-start' }}>
        <ThemedText children text="Funções" variant="label" tone="muted" />
        <ThemedListItem
          text="Categorias"
          icon={ChartColumnStacked}
          onPress={() => router.push('/(category)')}
        />
        <ThemedListItem
          text="Notificações"
          icon={FileText}
          onPress={() => router.push('/notifications')}
        />
        <ThemedListItem
          text={isSigningOut ? 'Saindo...' : 'Logout'}
          icon={LogOut}
          onPress={() => void handleLogout()}
        />
        <ThemedListItem
          text={isDeleting ? 'Excluindo...' : 'Excluir conta'}
          icon={Trash2}
          onPress={() => setShowDeleteConfirm(true)}
        />
      </ThemedContainer>

      <ThemedOverlayAlert
        visible={showDeleteConfirm}
        onRequestClose={() => setShowDeleteConfirm(false)}
        message="Esta ação é permanente. Todos os seus dados serão removidos."
        actions={[
          {
            label: 'Cancelar',
            onPress: () => setShowDeleteConfirm(false),
          },
          {
            label: 'Excluir',
            onPress: () => void handleDeleteAccount(),
          },
        ]}
      >
        <ThemedText
          variant="headline"
          text="Excluir conta?"
          style={{ textAlign: 'center', width: '100%' }}
        />
      </ThemedOverlayAlert>

      <ThemedOverlayAlert
        visible={feedbackMessage != null}
        onRequestClose={() => setFeedbackMessage(null)}
        message={feedbackMessage ?? ''}
        actions={[{ label: 'Entendi', onPress: () => setFeedbackMessage(null) }]}
      />
    </ThemedBackground>
  )
}
