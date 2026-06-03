import { iconByKey, type IconKey } from '@/utils/icons'
import { iconSize } from '@/utils/dimensions'
import { Tag } from 'lucide-react-native'

type Props = {
  name: IconKey | string
  size?: number
  color?: string
  strokeWidth?: number
}

export function AppIcon({ name, size = iconSize.md, color, strokeWidth = 2 }: Props) {
  const Icon = iconByKey[name as IconKey] ?? Tag
  return <Icon size={size} color={color} strokeWidth={strokeWidth} />
}
