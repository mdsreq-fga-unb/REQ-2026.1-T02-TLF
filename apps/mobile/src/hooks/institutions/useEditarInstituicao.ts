import { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { defaultAppearanceColor } from '@/utils/institutions/appearance'
import { updateInstitution } from '@/services/api/institutions'
import { institutionQueries } from '@/services/database/queries/institution'
import { useInstitutionForm } from '@/hooks/institutions/useInstitutionForm'
import { useInstitutionsStore } from '@/stores/institutions'
import type { IconKey } from '@/utils/icons'

const USE_MOCK_INSTITUTIONS = true

const DEFAULT_ICON: IconKey = 'landmark'

export function useEditarInstituicao() {
  const params = useLocalSearchParams<{
    id: string
    name?: string
    color?: string
    icon?: string
  }>()

  const id = params.id ?? ''

  const form = useInstitutionForm({
    initialName: params.name ?? '',
    initialColor: params.color ?? defaultAppearanceColor,
    initialIcon: (params.icon as IconKey) ?? DEFAULT_ICON,
    returnTo: `/instituicao/${id}`,
  })

  const updateInstitutionInStore = useInstitutionsStore((state) => state.updateInstitution)

  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSave = async () => {
    if (!form.validateName(form.name) || isSaving) return

    const payload = form.buildPayload()

    if (USE_MOCK_INSTITUTIONS) {
      updateInstitutionInStore(id, payload)
    } else {
      try {
        setIsSaving(true)
        await updateInstitution(id, payload)
        try {
          await institutionQueries.update(id, payload)
        } catch (localError) {
          // Falha ao atualizar o banco local nao deve bloquear o salvamento remoto
          console.warn('Falha ao atualizar instituicao no banco local:', localError)
        }
      } catch (saveError) {
        console.error('Erro ao atualizar instituicao:', saveError)
        form.setNameError('Não foi possível salvar. Tente novamente.')
        setIsSaving(false)
        return
      }
      setIsSaving(false)
    }

    setShowSuccess(true)
    setTimeout(() => router.navigate('/institutions'), 900)
  }

  const handleClose = () => router.navigate('/institutions')

  return {
    ...form,
    isSaving,
    showSuccess,
    handleSave,
    handleClose,
  }
}
