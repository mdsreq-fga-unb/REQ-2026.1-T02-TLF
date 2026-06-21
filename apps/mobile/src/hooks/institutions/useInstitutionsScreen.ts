import { useCallback, useEffect, useMemo, useState } from 'react'
import { router } from 'expo-router'
import type { InstitutionListItem } from '@/components/finance/institutions/types'
import { deleteInstitution, listInstitutions } from '@/services/api/institutions'
import { institutionQueries } from '@/services/database/queries/institution'
import { useInstitutionsStore } from '@/stores/institutions'
import {
  mapApiInstitutionToListItem,
  mapLocalInstitutionToListItem,
} from '@/utils/institutions/institutionMappers'

const USE_MOCK_INSTITUTIONS = true

export function useInstitutionsScreen() {
  const institutions = useInstitutionsStore((state) => state.institutions)
  const setInstitutions = useInstitutionsStore((state) => state.setInstitutions)
  const removeInstitution = useInstitutionsStore((state) => state.removeInstitution)

  const [isLoading, setIsLoading] = useState(USE_MOCK_INSTITUTIONS ? false : true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)
  const [blockedVisible, setBlockedVisible] = useState(false)

  useEffect(() => {
    if (USE_MOCK_INSTITUTIONS) return
    let isActive = true

    const loadInstitutions = async () => {
      try {
        setIsLoading(true)
        const data = await listInstitutions()

        if (!isActive) return

        setInstitutions(data.map(mapApiInstitutionToListItem))
        setError(null)
      } catch (loadError) {
        if (!isActive) return

        try {
          const localData = await institutionQueries.getAll()

          if (!isActive) return

          setInstitutions(localData.map(mapLocalInstitutionToListItem))
          setError('Sem conexao. Exibindo dados locais.')
        } catch (localError) {
          console.error('Erro ao carregar instituicoes:', loadError)
          console.error('Erro ao carregar instituicoes locais:', localError)
          setError('Nao foi possivel carregar as instituicoes.')
        }
      } finally {
        if (isActive) setIsLoading(false)
      }
    }

    loadInstitutions()

    return () => {
      isActive = false
    }
  }, [setInstitutions])

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => {
      if (prev) setSearchQuery('')
      return !prev
    })
  }, [])

  const handleOpen = useCallback((institution: InstitutionListItem) => {
    router.push({
      pathname: '/instituicao/[id]',
      params: {
        id: institution.id,
        name: institution.name,
        color: institution.color,
        icon: institution.icon ?? '',
      },
    })
  }, [])

  const handleCreate = useCallback(() => {
    router.push('/instituicao/nova')
  }, [])

  const performDelete = useCallback(
    async (institutionId: string) => {
      if (USE_MOCK_INSTITUTIONS) {
        removeInstitution(institutionId)
        return
      }

      try {
        await deleteInstitution(institutionId)
        removeInstitution(institutionId)
        try {
          await institutionQueries.delete(institutionId)
        } catch (localError) {
          // Falha ao remover do banco local nao deve bloquear a exclusao remota
          console.warn('Falha ao remover instituicao do banco local:', localError)
        }
        setError(null)
      } catch (deleteError) {
        console.error('Erro ao excluir instituicao:', deleteError)
        setError('Nao foi possivel excluir a instituicao.')
      }
    },
    [removeInstitution],
  )

  // Bloqueia a exclusão quando a instituição possui contas vinculadas;
  // caso contrário, abre o modal de confirmação.
  const handleDelete = useCallback(
    (institutionId: string) => {
      const institution = institutions.find((item) => item.id === institutionId)
      if (institution && (institution.accountsCount ?? 0) > 0) {
        setBlockedVisible(true)
        return
      }
      setPendingDeleteId(institutionId)
    },
    [institutions],
  )

  const confirmDelete = useCallback(() => {
    if (pendingDeleteId) void performDelete(pendingDeleteId)
    setPendingDeleteId(null)
  }, [pendingDeleteId, performDelete])

  const cancelDelete = useCallback(() => setPendingDeleteId(null), [])
  const dismissBlocked = useCallback(() => setBlockedVisible(false), [])

  const filteredInstitutions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return institutions
    return institutions.filter((institution) => institution.name.toLowerCase().includes(query))
  }, [institutions, searchQuery])

  return {
    institutions: filteredInstitutions,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    isSearchOpen,
    toggleSearch,
    handleOpen,
    handleCreate,
    handleDelete,
    confirmVisible: pendingDeleteId != null,
    confirmDelete,
    cancelDelete,
    blockedVisible,
    dismissBlocked,
  }
}
