import { ThemedOverlayAlert } from '@/components/ui/ThemedOverlayAlert'
import { useThemeColor } from '@/hooks/useThemeColor'
import { iconSize } from '@/utils/dimensions'
import { router } from 'expo-router'
import { AlertCircle } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { BackHandler, Platform } from 'react-native'

export function AndroidHardwareBackPortal() {
  const colors = useThemeColor()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return
    }

    const onBackPress = () => {
      if (router.canGoBack()) {
        router.back()
        return true
      }
      setVisible(true)
      return true
    }

    const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress)
    return () => sub.remove()
  }, [])

  return (
    <ThemedOverlayAlert
      visible={visible}
      onRequestClose={() => {
        setVisible(false)
      }}
      message="Deseja realmente sair do aplicativo?"
      actions={[
        {
          label: 'Cancelar',
          onPress: () => {
            setVisible(false)
          },
          fillTone: 'muted',
          textTone: 'default',
        },
        {
          label: 'Sair',
          onPress: () => {
            setVisible(false)
            BackHandler.exitApp()
          },
          fillTone: 'destructive',
          textTone: 'onPrimary',
        },
      ]}
    >
      <AlertCircle color={colors.destructive} size={iconSize.lg * 1.75} strokeWidth={2} />
    </ThemedOverlayAlert>
  )
}
