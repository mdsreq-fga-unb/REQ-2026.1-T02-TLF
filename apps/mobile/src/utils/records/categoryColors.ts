import { categoryDistribution } from '@/utils/fixtures/records'

export const CATEGORY_COLOR_PALETTE = categoryDistribution.map((category) => category.color)

export const CATEGORY_COLOR_MAP = new Map(
  categoryDistribution.map((category) => [category.name, category.color]),
)

export const FALLBACK_CATEGORY_COLOR = CATEGORY_COLOR_PALETTE[0] ?? '#6A66FF'

export const PALETTE_SIZE = CATEGORY_COLOR_PALETTE.length || 1

export function resolveCategoryColor(name: string, index: number): string {
  return (
    CATEGORY_COLOR_MAP.get(name) ??
    CATEGORY_COLOR_PALETTE[index % PALETTE_SIZE] ??
    FALLBACK_CATEGORY_COLOR
  )
}
