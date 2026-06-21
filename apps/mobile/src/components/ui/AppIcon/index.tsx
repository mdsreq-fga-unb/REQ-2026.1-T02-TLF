// apps/mobile/src/components/ui/AppIcon/index.tsx
import { resolveIcon, type IconKey } from '@/utils/icons'
import type { IconProps } from 'phosphor-react-native'

type Props = {
  name: IconKey | string
  size?: number
  color?: string
  weight?: IconProps['weight']
}

export function AppIcon({ name, size = 24, color, weight = 'regular' }: Props) {
  const Icon = resolveIcon(name)
  return <Icon size={size} color={color} weight={weight} />
}