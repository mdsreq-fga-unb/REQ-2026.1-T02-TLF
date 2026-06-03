import {
  HeartIcon,
  HouseIcon,
  UserIcon,
  CarIcon,
  BellIcon,
  CameraIcon,
  ChatCircleIcon,
  CreditCardIcon,
  FolderIcon,
  GearIcon,
  GlobeIcon,
  LeafIcon,
  MagnifyingGlassIcon,
  MusicNoteIcon,
  PhoneIcon,
  StarIcon,
  TagIcon,
  TrashIcon,
  WalletIcon,
  AirplaneIcon,
  AlarmIcon,
  ArchiveIcon,
  ArrowClockwiseIcon,
  ArrowCounterClockwiseIcon,
  BookIcon,
  BookmarkSimpleIcon,
  BriefcaseIcon,
  BrowserIcon,
  CalendarBlankIcon,
  CameraRotateIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
  CloudIcon,
  CodeIcon,
  CompassIcon,
  CopyIcon,
  DownloadSimpleIcon,
  EnvelopeSimpleIcon,
  EyeIcon,
  EyeSlashIcon,
  FileIcon,
  FileTextIcon,
  FlagIcon,
  FunnelIcon,
  GiftIcon,
  HandHeartIcon,
  HeadphonesIcon,
  ImageIcon,
  InfoIcon,
  KeyIcon,
  LightbulbIcon,
  LinkSimpleIcon,
  ListBulletsIcon,
  MapPinIcon,
  MicrophoneIcon,
  MoonIcon,
  PaperPlaneRightIcon,
  PauseIcon,
  PencilSimpleIcon,
  PlayIcon,
  PrinterIcon,
  RocketIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  SmileyIcon,
  SparkleIcon,
  SpeakerHighIcon,
  SquaresFourIcon,
  StorefrontIcon,
  SwatchesIcon,
  ThumbsUpIcon,
  TimerIcon,
  ToggleLeftIcon,
  TrophyIcon,
  TruckIcon,
  UploadSimpleIcon,
  UserCircleIcon,
  UserPlusIcon,
  VideoCameraIcon,
  WifiHighIcon,
  WrenchIcon,
  XCircleIcon,
} from 'phosphor-react-native'
import { useState, useMemo } from 'react'

type IconProps = { size?: number; color?: string }

type IconItem = {
  key: string
  label: string
  Icon: React.ComponentType<IconProps>
}

type ColorItem = {
  key: string
  label: string
  color: string
}

type CategoryItem = {
  id: string
  name: string
  icon: IconItem
  color: ColorItem
}

export function useCategory() {
  const ICONS: IconItem[] = [
    { key: 'heart', label: 'Coração', Icon: HeartIcon },
    { key: 'house', label: 'Casa', Icon: HouseIcon },
    { key: 'user', label: 'Usuário', Icon: UserIcon },
    { key: 'car', label: 'Carro', Icon: CarIcon },
    { key: 'bell', label: 'Sino', Icon: BellIcon },
    { key: 'camera', label: 'Câmera', Icon: CameraIcon },
    { key: 'chat', label: 'Chat', Icon: ChatCircleIcon },
    { key: 'card', label: 'Cartão', Icon: CreditCardIcon },
    { key: 'folder', label: 'Pasta', Icon: FolderIcon },
    { key: 'gear', label: 'Configurações', Icon: GearIcon },
    { key: 'globe', label: 'Globo', Icon: GlobeIcon },
    { key: 'leaf', label: 'Folha', Icon: LeafIcon },
    { key: 'search', label: 'Pesquisar', Icon: MagnifyingGlassIcon },
    { key: 'music', label: 'Música', Icon: MusicNoteIcon },
    { key: 'phone', label: 'Telefone', Icon: PhoneIcon },
    { key: 'star', label: 'Estrela', Icon: StarIcon },
    { key: 'tag', label: 'Etiqueta', Icon: TagIcon },
    { key: 'trash', label: 'Lixeira', Icon: TrashIcon },
    { key: 'wallet', label: 'Carteira', Icon: WalletIcon },
    { key: 'alarm', label: 'Alarme', Icon: AlarmIcon },
    { key: 'archive', label: 'Arquivar', Icon: ArchiveIcon },
    { key: 'airplane', label: 'Avião', Icon: AirplaneIcon },
    { key: 'arrow-clockwise', label: 'Atualizar', Icon: ArrowClockwiseIcon },
    { key: 'arrow-counter-clockwise', label: 'Desfazer', Icon: ArrowCounterClockwiseIcon },
    { key: 'book', label: 'Livro', Icon: BookIcon },
    { key: 'bookmark', label: 'Marcador', Icon: BookmarkSimpleIcon },
    { key: 'briefcase', label: 'Maleta', Icon: BriefcaseIcon },
    { key: 'browser', label: 'Navegador', Icon: BrowserIcon },
    { key: 'calendar', label: 'Calendário', Icon: CalendarBlankIcon },
    { key: 'camera-rotate', label: 'Girar câmera', Icon: CameraRotateIcon },
    { key: 'chart-bar', label: 'Gráfico de barras', Icon: ChartBarIcon },
    { key: 'check-circle', label: 'Confirmar', Icon: CheckCircleIcon },
    { key: 'clock', label: 'Relógio', Icon: ClockIcon },
    { key: 'cloud', label: 'Nuvem', Icon: CloudIcon },
    { key: 'code', label: 'Código', Icon: CodeIcon },
    { key: 'compass', label: 'Bússola', Icon: CompassIcon },
    { key: 'copy', label: 'Copiar', Icon: CopyIcon },
    { key: 'download', label: 'Baixar', Icon: DownloadSimpleIcon },
    { key: 'envelope', label: 'Email', Icon: EnvelopeSimpleIcon },
    { key: 'eye', label: 'Visualizar', Icon: EyeIcon },
    { key: 'eye-slash', label: 'Ocultar', Icon: EyeSlashIcon },
    { key: 'file', label: 'Arquivo', Icon: FileIcon },
    { key: 'file-text', label: 'Arquivo de texto', Icon: FileTextIcon },
    { key: 'flag', label: 'Bandeira', Icon: FlagIcon },
    { key: 'funnel', label: 'Filtro', Icon: FunnelIcon },
    { key: 'gift', label: 'Presente', Icon: GiftIcon },
    { key: 'hand-heart', label: 'Mão com coração', Icon: HandHeartIcon },
    { key: 'headphones', label: 'Fones de ouvido', Icon: HeadphonesIcon },
    { key: 'image', label: 'Imagem', Icon: ImageIcon },
    { key: 'info', label: 'Informação', Icon: InfoIcon },
    { key: 'key', label: 'Chave', Icon: KeyIcon },
    { key: 'lightbulb', label: 'Lâmpada', Icon: LightbulbIcon },
    { key: 'link', label: 'Link', Icon: LinkSimpleIcon },
    { key: 'list', label: 'Lista', Icon: ListBulletsIcon },
    { key: 'map-pin', label: 'Pino de mapa', Icon: MapPinIcon },
    { key: 'microphone', label: 'Microfone', Icon: MicrophoneIcon },
    { key: 'moon', label: 'Lua', Icon: MoonIcon },
    { key: 'paper-plane', label: 'Enviar', Icon: PaperPlaneRightIcon },
    { key: 'pause', label: 'Pausar', Icon: PauseIcon },
    { key: 'pencil', label: 'Editar', Icon: PencilSimpleIcon },
    { key: 'play', label: 'Reproduzir', Icon: PlayIcon },
    { key: 'printer', label: 'Impressora', Icon: PrinterIcon },
    { key: 'rocket', label: 'Foguete', Icon: RocketIcon },
    { key: 'shield-check', label: 'Escudo com confirmação', Icon: ShieldCheckIcon },
    { key: 'shopping-cart', label: 'Carrinho', Icon: ShoppingCartIcon },
    { key: 'smiley', label: 'Sorriso', Icon: SmileyIcon },
    { key: 'speaker', label: 'Alto-falante', Icon: SpeakerHighIcon },
    { key: 'sparkles', label: 'Brilhos', Icon: SparkleIcon },
    { key: 'squares-four', label: 'Grade', Icon: SquaresFourIcon },
    { key: 'storefront', label: 'Loja', Icon: StorefrontIcon },
    { key: 'swatches', label: 'Paleta', Icon: SwatchesIcon },
    { key: 'thumbs-up', label: 'Gostei', Icon: ThumbsUpIcon },
    { key: 'timer', label: 'Temporizador', Icon: TimerIcon },
    { key: 'toggle-left', label: 'Alternar', Icon: ToggleLeftIcon },
    { key: 'trophy', label: 'Troféu', Icon: TrophyIcon },
    { key: 'truck', label: 'Caminhão', Icon: TruckIcon },
    { key: 'upload', label: 'Enviar', Icon: UploadSimpleIcon },
    { key: 'user-circle', label: 'Usuário em círculo', Icon: UserCircleIcon },
    { key: 'user-plus', label: 'Adicionar usuário', Icon: UserPlusIcon },
    { key: 'video-camera', label: 'Câmera de vídeo', Icon: VideoCameraIcon },
    { key: 'wifi', label: 'Wi-Fi', Icon: WifiHighIcon },
    { key: 'wrench', label: 'Chave inglesa', Icon: WrenchIcon },
    { key: 'x-circle', label: 'Fechar', Icon: XCircleIcon },
  ]

  const [iconQuery, setIconQuery] = useState('')
  const [selectedIcon, setSelectedIcon] = useState('heart')
  const [iconPickerVisible, setIconPickerVisible] = useState(false)
  const [icon, setIcon] = useState('heart')

  const filteredIcons = useMemo(() => {
    const q = iconQuery.trim().toLowerCase()
    if (!q) return ICONS
    return ICONS.filter((item) => item.label.toLowerCase().includes(q))
  }, [iconQuery])

  const iconComponent = useMemo(() => ICONS.find((item) => item.key === icon)?.Icon, [icon])

  const COLORS: ColorItem[] = [
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

  const [categoryColor, setCategoryColor] = useState('#ff0000')
  const [colorPickerVisible, setColorPickerVisible] = useState(false)

  // TODO: remover para integração
  // MOCK para testagem

  const CATEGORYS: CategoryItem[] = [
    {
      id: '1',
      name: 'Musica',
      icon: { key: 'speaker', label: 'Alto-falante', Icon: SpeakerHighIcon },
      color: { key: 'white', label: 'Branco', color: '#FFFFFF' },
    },
    {
      id: '2',
      name: 'Mercado',
      icon: { key: 'storefront', label: 'Loja', Icon: StorefrontIcon },
      color: { key: 'orange', label: 'Laranja', color: '#F97316' },
    },
    {
      id: '3',
      name: 'Advogado',
      icon: { key: 'file-text', label: 'Arquivo de texto', Icon: FileTextIcon },
      color: { key: 'lime', label: 'Lima', color: '#84CC16' },
    },
  ]

  return {
    ICONS,
    COLORS,
    CATEGORYS,
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
    iconComponent,
  }
}
