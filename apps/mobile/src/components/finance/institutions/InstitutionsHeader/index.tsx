import { Pressable, View } from 'react-native'
import { ArrowLeft, Search, X } from 'lucide-react-native'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { styles } from './style'

type Props = {
  title?: string
  isSearchOpen?: boolean
  onBack?: () => void
  onToggleSearch?: () => void
}

export function InstitutionsHeader({
  title = 'Instituições',
  isSearchOpen = false,
  onBack,
  onToggleSearch,
}: Props) {
  const theme = useThemeColor()

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onBack}
        hitSlop={8}
        style={({ pressed }) => [styles.iconButton, { opacity: pressed ? 0.6 : 1 }]}
      >
        <ArrowLeft size={24} color={theme.foreground} />
      </Pressable>

      <ThemedText text={title} variant="title" style={styles.title} numberOfLines={1} />

      <Pressable
        onPress={onToggleSearch}
        hitSlop={8}
        style={({ pressed }) => [styles.iconButton, { opacity: pressed ? 0.6 : 1 }]}
      >
        {isSearchOpen ? (
          <X size={24} color={theme.foreground} />
        ) : (
          <Search size={24} color={theme.foreground} />
        )}
      </Pressable>
    </View>
  )
}
