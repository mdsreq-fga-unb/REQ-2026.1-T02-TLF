import { ThemedContainer } from '@/components/ui/ThemedContainer'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { AlertCircle } from 'lucide-react-native'
import { styles } from './style'

type Props = {
  message: string
  visible: boolean
}

export function ThemedFieldError({ message, visible }: Props) {
  const colors = useThemeColor()
  if (!message || !visible) {
    return null
  }
  return (
    <ThemedContainer variant="transparent" style={styles.container}>
      <AlertCircle size={20} color={colors.destructive} strokeWidth={2} />
      <ThemedText variant="caption" tone="destructive" text={message} style={styles.text} />
    </ThemedContainer>
  )
}
