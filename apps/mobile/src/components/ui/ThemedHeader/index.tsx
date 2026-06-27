import { Image, Pressable, View } from 'react-native'
import { UserRound, Bell } from 'lucide-react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import { resolveTextTone, TextTone } from '@/utils/textTone'
import { iconSize, layout } from '@/utils/dimensions'
import { styles } from './style'
import { router } from 'expo-router'
import { ThemedText } from '@/components/ui/ThemedText'
import AppLogo from '../../../../assets/imgs/tlt-icon.png'

type props = {
  iconTone?: TextTone
}

export function ThemedHeader({ iconTone = 'default' }: props) {
  const colors = useThemeColor()
  const iconColor = resolveTextTone(colors, iconTone)

  return (
    <View style={[styles.header, { backgroundColor: colors.primary }]}>
      <Pressable style={styles.brandWrap}>
        <Image
          source={AppLogo}
          style={{ width: layout.authLogoSize * 0.35, height: layout.authLogoSize * 0.35 }}
        />
        <ThemedText variant="title" text="TLT FINANÇAS" style={{ color: colors.onPrimary }} />
      </Pressable>
      <View style={styles.actionsWrap}>
        <Pressable>
          <View style={[styles.iconWrap, { backgroundColor: colors.surfaceMuted }]}>
            <UserRound color={iconColor} size={iconSize.lg} />
          </View>
        </Pressable>
        <Pressable onPress={() => router.push('/notifications')}>
          <Bell color={iconColor} size={iconSize.lg} />
        </Pressable>
      </View>
    </View>
  )
}
