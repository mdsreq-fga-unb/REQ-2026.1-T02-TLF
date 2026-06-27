// apps/mobile/src/components/ui/AppIcon/index.tsx
import { resolveIcon, type IconKey } from '@/utils/icons'

type Props = {
  name: IconKey | string
  size?: number
  color?: string
  strokeWidth?: number
}

export function AppIcon({ name, size = 24, color, strokeWidth }: Props) {
  const Icon = resolveIcon(name)
  return <Icon size={size} color={color} strokeWidth={strokeWidth} />
}
