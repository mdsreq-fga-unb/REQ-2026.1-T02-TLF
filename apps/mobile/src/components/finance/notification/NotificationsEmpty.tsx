import { ThemedContainer } from '@/components/ui/ThemedContainer'
import { ThemedText } from '@/components/ui/ThemedText'
import { spacing } from '@/utils/dimensions'
import { StyleSheet } from 'react-native'

export function NotificationsEmpty() {
  return (
    <ThemedContainer variant="transparent" style={styles.container}>
      <ThemedText text="Nenhuma notificação por aqui" variant="label" tone="muted" />
      <ThemedText
        text="As notificações aparecerão aqui quando houver novidades."
        variant="caption"
        tone="muted"
      />
    </ThemedContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.xs,
  },
})
