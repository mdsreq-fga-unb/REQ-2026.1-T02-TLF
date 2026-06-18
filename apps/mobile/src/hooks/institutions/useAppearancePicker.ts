import { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import {
  appearanceColors,
  appearanceIcons,
  defaultAppearanceColor,
  defaultAppearanceIcon,
  isValidAppearanceColor,
  isValidAppearanceIcon,
  type AppearanceColor,
} from '@/utils/institutions/appearance'
import type { IconKey } from '@/utils/icons'

const DEFAULT_RETURN_TO = '/instituicao/nova'

export function useAppearancePicker() {
  const params = useLocalSearchParams<{
    color?: string
    icon?: string
    name?: string
    returnTo?: string
  }>()

  const [selectedColor, setSelectedColor] = useState<AppearanceColor>(
    isValidAppearanceColor(params.color) ? params.color : defaultAppearanceColor,
  )
  const [selectedIcon, setSelectedIcon] = useState<IconKey>(
    isValidAppearanceIcon(params.icon) ? params.icon : defaultAppearanceIcon,
  )

  const handleClose = () => {
    router.back()
  }

  const handleSave = () => {
    router.navigate({
      pathname: (params.returnTo || DEFAULT_RETURN_TO) as never,
      params: {
        color: selectedColor,
        icon: selectedIcon,
        ...(params.name ? { name: params.name } : {}),
      },
    })
  }

  return {
    colors: appearanceColors,
    icons: appearanceIcons,
    selectedColor,
    selectedIcon,
    selectColor: setSelectedColor,
    selectIcon: setSelectedIcon,
    handleClose,
    handleSave,
  }
}
