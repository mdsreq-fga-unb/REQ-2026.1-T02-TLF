import { Pressable, View } from 'react-native'
import { UserRound, Bell } from 'lucide-react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import { resolveTextTone, TextTone } from '@/utils/textTone'
import { iconSize } from '@/utils/dimensions'
import { styles } from './style'
import { router } from 'expo-router'

type props = {
  iconTone?: TextTone
}

export function ThemedHeader({ iconTone = 'default' }: props) {
  const colors = useThemeColor()
  const iconColor = resolveTextTone(colors, iconTone)
  return (
    <View style={[styles.header, { backgroundColor: colors.primary }]}>
      {/* TODO: add caminho para perfil do usuario (configs, dados como email e outros) */}
      <Pressable>
        <View style={[styles.iconWrap, { backgroundColor: colors.surfaceMuted }]}>
          <UserRound color={iconColor} size={iconSize.lg} />
        </View>
      </Pressable>
      <Pressable onPress={() => router.push('/notifications')}>
        <Bell color={iconColor} size={iconSize.lg} />
      </Pressable>
    </View>
  )
}
