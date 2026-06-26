import type { CategoryDTO } from '@/services/api/category'
import { categoryQueries } from '@/services/database/repository/category'
import { syncDatabase } from '@/services/database/sync'
import { router, useFocusEffect } from 'expo-router'
import { useState, useMemo, useCallback } from 'react'
import { resolveIcon, type AppIcon } from '@/utils/icons'

export type IconItem = {
  key: string
  label: string
  Icon: AppIcon
}

export type ColorItem = {
  key: string
  label: string
  color: string
}

const ICONS_DATA: Array<{ key: string; label: string; Icon: AppIcon }> = [
  { key: 'heart', label: 'Coração', Icon: resolveIcon('heart') },
  { key: 'heartbeat', label: 'Coração', Icon: resolveIcon('heartbeat') },
  { key: 'shopping-bag', label: 'sacola', Icon: resolveIcon('shopping-bag') },
  { key: 'bus', label: 'onibus', Icon: resolveIcon('bus') },
  { key: 'currency-dollar', label: 'dinheiro', Icon: resolveIcon('currency-dollar') },
  { key: 'receipt', label: 'receita', Icon: resolveIcon('receipt') },
  { key: 'house', label: 'Casa', Icon: resolveIcon('house') },
  { key: 'user', label: 'Usuário', Icon: resolveIcon('user') },
  { key: 'car', label: 'Carro', Icon: resolveIcon('car') },
  { key: 'bell', label: 'Sino', Icon: resolveIcon('bell') },
  { key: 'camera', label: 'Câmera', Icon: resolveIcon('camera') },
  { key: 'chat', label: 'Chat', Icon: resolveIcon('chat') },
  { key: 'card', label: 'Cartão', Icon: resolveIcon('card') },
  { key: 'folder', label: 'Pasta', Icon: resolveIcon('folder') },
  { key: 'gear', label: 'Configurações', Icon: resolveIcon('gear') },
  { key: 'globe', label: 'Globo', Icon: resolveIcon('globe') },
  { key: 'leaf', label: 'Folha', Icon: resolveIcon('leaf') },
  { key: 'search', label: 'Pesquisar', Icon: resolveIcon('search') },
  { key: 'music', label: 'Música', Icon: resolveIcon('music') },
  { key: 'phone', label: 'Telefone', Icon: resolveIcon('phone') },
  { key: 'star', label: 'Estrela', Icon: resolveIcon('star') },
  { key: 'tag', label: 'Etiqueta', Icon: resolveIcon('tag') },
  { key: 'trash', label: 'Lixeira', Icon: resolveIcon('trash') },
  { key: 'wallet', label: 'Carteira', Icon: resolveIcon('wallet') },
  { key: 'alarm', label: 'Alarme', Icon: resolveIcon('alarm') },
  { key: 'archive', label: 'Arquivar', Icon: resolveIcon('archive') },
  { key: 'airplane', label: 'Avião', Icon: resolveIcon('airplane') },
  { key: 'arrow-clockwise', label: 'Atualizar', Icon: resolveIcon('arrow-clockwise') },
  {
    key: 'arrow-counter-clockwise',
    label: 'Desfazer',
    Icon: resolveIcon('arrow-counter-clockwise'),
  },
  { key: 'book', label: 'Livro', Icon: resolveIcon('book') },
  { key: 'bookmark', label: 'Marcador', Icon: resolveIcon('bookmark') },
  { key: 'briefcase', label: 'Maleta', Icon: resolveIcon('briefcase') },
  { key: 'browser', label: 'Navegador', Icon: resolveIcon('browser') },
  { key: 'calendar', label: 'Calendário', Icon: resolveIcon('calendar') },
  { key: 'camera-rotate', label: 'Girar câmera', Icon: resolveIcon('camera-rotate') },
  { key: 'chart-bar', label: 'Gráfico de barras', Icon: resolveIcon('chart-bar') },
  { key: 'check-circle', label: 'Confirmar', Icon: resolveIcon('check-circle') },
  { key: 'clock', label: 'Relógio', Icon: resolveIcon('clock') },
  { key: 'cloud', label: 'Nuvem', Icon: resolveIcon('cloud') },
  { key: 'code', label: 'Código', Icon: resolveIcon('code') },
  { key: 'compass', label: 'Bússola', Icon: resolveIcon('compass') },
  { key: 'copy', label: 'Copiar', Icon: resolveIcon('copy') },
  { key: 'download', label: 'Baixar', Icon: resolveIcon('download') },
  { key: 'envelope', label: 'Email', Icon: resolveIcon('envelope') },
  { key: 'eye', label: 'Visualizar', Icon: resolveIcon('eye') },
  { key: 'eye-slash', label: 'Ocultar', Icon: resolveIcon('eye-slash') },
  { key: 'file', label: 'Arquivo', Icon: resolveIcon('file') },
  { key: 'file-text', label: 'Arquivo de texto', Icon: resolveIcon('file-text') },
  { key: 'flag', label: 'Bandeira', Icon: resolveIcon('flag') },
  { key: 'funnel', label: 'Filtro', Icon: resolveIcon('funnel') },
  { key: 'gift', label: 'Presente', Icon: resolveIcon('gift') },
  { key: 'hand-heart', label: 'Mão com coração', Icon: resolveIcon('hand-heart') },
  { key: 'headphones', label: 'Fones de ouvido', Icon: resolveIcon('headphones') },
  { key: 'image', label: 'Imagem', Icon: resolveIcon('image') },
  { key: 'info', label: 'Informação', Icon: resolveIcon('info') },
  { key: 'key', label: 'Chave', Icon: resolveIcon('key') },
  { key: 'lightbulb', label: 'Lâmpada', Icon: resolveIcon('lightbulb') },
  { key: 'link', label: 'Link', Icon: resolveIcon('link') },
  { key: 'list', label: 'Lista', Icon: resolveIcon('list') },
  { key: 'map-pin', label: 'Pino de mapa', Icon: resolveIcon('map-pin') },
  { key: 'microphone', label: 'Microfone', Icon: resolveIcon('microphone') },
  { key: 'moon', label: 'Lua', Icon: resolveIcon('moon') },
  { key: 'paper-plane', label: 'Enviar', Icon: resolveIcon('paper-plane') },
  { key: 'pause', label: 'Pausar', Icon: resolveIcon('pause') },
  { key: 'pencil', label: 'Editar', Icon: resolveIcon('pencil') },
  { key: 'play', label: 'Reproduzir', Icon: resolveIcon('play') },
  { key: 'printer', label: 'Impressora', Icon: resolveIcon('printer') },
  { key: 'rocket', label: 'Foguete', Icon: resolveIcon('rocket') },
  { key: 'shield-check', label: 'Escudo com confirmação', Icon: resolveIcon('shield-check') },
  { key: 'shopping-cart', label: 'Carrinho', Icon: resolveIcon('shopping-cart') },
  { key: 'smiley', label: 'Sorriso', Icon: resolveIcon('smiley') },
  { key: 'speaker', label: 'Alto-falante', Icon: resolveIcon('speaker') },
  { key: 'sparkles', label: 'Brilhos', Icon: resolveIcon('sparkles') },
  { key: 'squares-four', label: 'Grade', Icon: resolveIcon('squares-four') },
  { key: 'storefront', label: 'Loja', Icon: resolveIcon('storefront') },
  { key: 'swatches', label: 'Paleta', Icon: resolveIcon('swatches') },
  { key: 'thumbs-up', label: 'Gostei', Icon: resolveIcon('thumbs-up') },
  { key: 'timer', label: 'Temporizador', Icon: resolveIcon('timer') },
  { key: 'toggle-left', label: 'Alternar', Icon: resolveIcon('toggle-left') },
  { key: 'trophy', label: 'Troféu', Icon: resolveIcon('trophy') },
  { key: 'truck', label: 'Caminhão', Icon: resolveIcon('truck') },
  { key: 'upload', label: 'Enviar', Icon: resolveIcon('upload') },
  { key: 'user-circle', label: 'Usuário em círculo', Icon: resolveIcon('user-circle') },
  { key: 'user-plus', label: 'Adicionar usuário', Icon: resolveIcon('user-plus') },
  { key: 'video-camera', label: 'Câmera de vídeo', Icon: resolveIcon('video-camera') },
  { key: 'wifi', label: 'Wi-Fi', Icon: resolveIcon('wifi') },
  { key: 'wrench', label: 'Chave inglesa', Icon: resolveIcon('wrench') },
  { key: 'x-circle', label: 'Fechar', Icon: resolveIcon('x-circle') },
]

const COLORS_DATA: ColorItem[] = [
  { key: 'red', label: 'Vermelho', color: '#EF4444' },
  { key: 'orange', label: 'Laranja', color: '#F97316' },
  { key: 'amber', label: 'Âmbar', color: '#F59E0B' },
  { key: 'yellow', label: 'Amarelo', color: '#EAB308' },
  { key: 'lime', label: 'Lima', color: '#84CC16' },
  { key: 'green', label: 'Verde', color: '#22C55E' },
  { key: 'emerald', label: 'Esmeralda', color: '#10B981' },
  { key: 'teal', label: 'Turquesa', color: '#14B8A6' },
  { key: 'cyan', label: 'Ciano', color: '#06B6D4' },
  { key: 'sky', label: 'Céu', color: '#0EA5E9' },
  { key: 'blue', label: 'Azul', color: '#3B82F6' },
  { key: 'indigo', label: 'Índigo', color: '#6366F1' },
  { key: 'violet', label: 'Violeta', color: '#8B5CF6' },
  { key: 'purple', label: 'Roxo', color: '#A855F7' },
  { key: 'fuchsia', label: 'Fúcsia', color: '#D946EF' },
  { key: 'pink', label: 'Rosa', color: '#EC4899' },
  { key: 'rose', label: 'Rosa Escuro', color: '#F43F5E' },
  { key: 'gray', label: 'Cinza', color: '#6B7280' },
  { key: 'slate', label: 'Ardósia', color: '#64748B' },
  { key: 'zinc', label: 'Zinco', color: '#71717A' },
  { key: 'neutral', label: 'Neutro', color: '#737373' },
  { key: 'stone', label: 'Pedra', color: '#78716C' },
  { key: 'black', label: 'Preto', color: '#111827' },
  { key: 'white', label: 'Branco', color: '#FFFFFF' },
]

export function useCategory() {
  const ICONS = useMemo<IconItem[]>(
    () =>
      ICONS_DATA.map((item) => ({
        ...item,
        Icon: resolveIcon(item.key),
      })),
    [],
  )

  const COLORS = useMemo<ColorItem[]>(() => COLORS_DATA, [])

  const [iconQuery, setIconQuery] = useState('')
  const [selectedIcon, setSelectedIcon] = useState('heart')
  const [iconPickerVisible, setIconPickerVisible] = useState(false)
  const [icon, setIcon] = useState('heart')

  const filteredIcons = useMemo(() => {
    const q = iconQuery.trim().toLowerCase()
    if (!q) return ICONS
    return ICONS.filter((item) => item.label.toLowerCase().includes(q))
  }, [ICONS, iconQuery])

  const iconComponent = useMemo(() => ICONS.find((item) => item.key === icon)?.Icon, [ICONS, icon])

  const iconMapper = useMemo<Record<string, AppIcon>>(
    () => Object.fromEntries(ICONS.map((item) => [item.key, item.Icon])) as Record<string, AppIcon>,
    [ICONS],
  )

  const colorMapper = useMemo(
    () => Object.fromEntries(COLORS.map((color) => [color.key, color.color])),
    [COLORS],
  )

  const getColorHex = useCallback(
    (colorKey?: string) => {
      if (!colorKey) return '#000000'
      return (colorMapper as Record<string, string>)[colorKey] ?? colorKey
    },
    [colorMapper],
  )

  const [categoryColor, setCategoryColor] = useState('#ff0000')
  const [colorPickerVisible, setColorPickerVisible] = useState(false)

  const [categories, setCategories] = useState<CategoryDTO[]>([])
  const [loading, setLoading] = useState(true)

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true)
      const data = await categoryQueries.getAll()
      setCategories(
        data.map((item) => ({ id: item.id, name: item.name, icon: item.icon, color: item.color })),
      )

      void (async () => {
        try {
          await syncDatabase()
          const refreshed = await categoryQueries.getAll()
          setCategories(
            refreshed.map((item) => ({
              id: item.id,
              name: item.name,
              icon: item.icon,
              color: item.color,
            })),
          )
        } catch (syncError) {
          console.warn('[OFFLINE-FIRST] Sincronização de categorias indisponível.', syncError)
        }
      })()
    } finally {
      setLoading(false)
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      void loadCategories()
    }, [loadCategories]),
  )

  const mappedCategories = useMemo(
    () =>
      categories.map((item) => ({
        ...item,
        iconComponent: iconMapper[item.icon],
        colorHex: getColorHex(item.color),
      })),
    [categories, getColorHex, iconMapper],
  )

  const [name, setName] = useState('')
  const [nameTouched, setNameTouched] = useState(false)

  const isFormValid = name !== ''

  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const dismissFeedback = useCallback(() => setFeedbackMessage(null), [])

  const handleCreateSubmit = async (name: string, icon: string, color: string) => {
    try {
      await categoryQueries.create({ name, icon, color })
      void syncDatabase()
      router.back()
    } catch (error) {
      console.error('[Category] Falha ao criar categoria', error)
      setFeedbackMessage('Não foi possível salvar a categoria.')
    }
  }

  const handleEditSubmit = async (id: string, name: string, icon: string, color: string) => {
    try {
      await categoryQueries.update(id, { name, icon, color })
      void syncDatabase()
      router.back()
    } catch (error) {
      console.error('[Category] Falha ao atualizar categoria', error)
      setFeedbackMessage('Não foi possível atualizar a categoria.')
    }
  }

  return {
    ICONS,
    COLORS,
    categories,
    setCategories,
    loading,
    setLoading,
    loadCategories,
    mappedCategories,
    iconQuery,
    setIconQuery,
    selectedIcon,
    setSelectedIcon,
    filteredIcons,
    colorPickerVisible,
    setColorPickerVisible,
    categoryColor,
    setCategoryColor,
    iconPickerVisible,
    setIconPickerVisible,
    icon,
    setIcon,
    name,
    setName,
    nameTouched,
    setNameTouched,
    isFormValid,
    feedbackMessage,
    setFeedbackMessage,
    dismissFeedback,
    handleCreateSubmit,
    handleEditSubmit,
    iconComponent,
  }
}
