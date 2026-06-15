import { useState } from 'react'
import { router } from 'expo-router'
import { defaultAppearanceColor } from '@/utils/institutions/appearance'
import { createInstitution } from '@/services/api/institutions'
import { institutionQueries } from '@/services/database/queries/institution'
import { useInstitutionForm } from '@/hooks/institutions/useInstitutionForm'
import { useInstitutionsStore } from '@/stores/institutions'
import type { IconKey } from '@/utils/icons'

const USE_MOCK_INSTITUTIONS = true

const DEFAULT_ICON: IconKey = 'landmark'

export function useNovaInstituicao() {
  const form = useInstitutionForm({
    initialName: '',
    initialColor: defaultAppearanceColor,
    initialIcon: DEFAULT_ICON,
    returnTo: '/instituicao/nova',
  })

  const addInstitution = useInstitutionsStore((state) => state.addInstitution)

  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSave = async () => {
    if (!form.validateName(form.name) || isSaving) return

    const payload = form.buildPayload()

    if (USE_MOCK_INSTITUTIONS) {
      addInstitution({ id: `inst-${Date.now()}`, ...payload })
    } else {
      try {
        setIsSaving(true)
        await createInstitution(payload)
        try {
          await institutionQueries.create(payload)
        } catch (localError) {
          // Falha ao criar no banco local nao deve bloquear o salvamento remoto
          console.warn('Falha ao criar instituicao no banco local:', localError)
        }
      } catch (saveError) {
        console.error('Erro ao criar instituicao:', saveError)
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
