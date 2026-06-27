export function useColors() {
  function hexToRgba(hex: string, alpha = 1): string {
    if (!hex) return `rgba(0,0,0,${alpha})`
    const cleaned = hex.replace('#', '').trim()
    const hexFull =
      cleaned.length === 3
        ? cleaned
            .split('')
            .map((c) => c + c)
            .join('')
        : cleaned
    const r = parseInt(hexFull.substring(0, 2), 16)
    const g = parseInt(hexFull.substring(2, 4), 16)
    const b = parseInt(hexFull.substring(4, 6), 16)
    const a = Math.max(0, Math.min(1, alpha))
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }

  function withOpacity(hex: string, opacity: number): string {
    return hexToRgba(hex, opacity)
  }
  return {
    hexToRgba,
    withOpacity,
  }
}
