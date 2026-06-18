import { useEffect, useMemo, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import type { IconKey } from '@/utils/icons'

type Args = {
  initialName: string
  initialColor: string
  initialIcon: IconKey
  returnTo: string
}

export function useInstitutionForm({ initialName, initialColor, initialIcon, returnTo }: Args) {
  const params = useLocalSearchParams<{ color?: string; icon?: string }>()

  const [name, setName] = useState(initialName)
  const [color, setColor] = useState(initialColor)
  const [icon, setIcon] = useState<IconKey>(initialIcon)
  const [nameError, setNameError] = useState<string | undefined>()

  // Aplica a cor/ícone retornados pela tela de aparência (preserva o nome digitado).
  useEffect(() => {
    if (params.color) setColor(params.color)
  }, [params.color])

  useEffect(() => {
    if (params.icon) setIcon(params.icon as IconKey)
  }, [params.icon])

  const validateName = (value: string): boolean => {
    if (!value.trim()) {
      setNameError('Informe o nome da instituição.')
      return false
    }
    setNameError(undefined)
    return true
  }

  const isFormValid = useMemo(() => name.trim().length > 0, [name])
  const previewName = name.trim() || 'Nome da Instituição'

  const openAppearance = () => {
    router.push({ pathname: '/instituicao/aparencia', params: { color, icon, name, returnTo } })
  }

  return {
    name,
    setName,
    color,
    icon,
    nameError,
    setNameError,
    validateName,
    isFormValid,
    previewName,
    openAppearance,
    buildPayload: () => ({ name: name.trim(), color, icon }),
  }
}
