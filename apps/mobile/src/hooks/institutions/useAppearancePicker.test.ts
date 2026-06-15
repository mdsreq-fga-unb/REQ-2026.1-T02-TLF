import { renderHook, act } from '@testing-library/react-native'
import { router } from 'expo-router'
import {
  appearanceColors,
  appearanceIcons,
  defaultAppearanceColor,
  defaultAppearanceIcon,
} from '@/utils/institutions/appearance'
import { useAppearancePicker } from './useAppearancePicker'

let mockParams: { color?: string; icon?: string; name?: string; returnTo?: string } = {}

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), navigate: jest.fn(), back: jest.fn() },
  useLocalSearchParams: () => mockParams,
}))

const mockedNavigate = jest.mocked(router.navigate)
const mockedBack = jest.mocked(router.back)

describe('useAppearancePicker', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockParams = {}
  })

  describe('initial state', () => {
    it('should expose the full catalog of colors and icons', () => {
      const { result } = renderHook(() => useAppearancePicker())

      expect(result.current.colors).toEqual(appearanceColors)
      expect(result.current.icons).toEqual(appearanceIcons)
    })

    it('should fall back to the defaults when no params are provided', () => {
      const { result } = renderHook(() => useAppearancePicker())

      expect(result.current.selectedColor).toBe(defaultAppearanceColor)
      expect(result.current.selectedIcon).toBe(defaultAppearanceIcon)
    })

    it('should use valid params as the initial selection', () => {
      mockParams = { color: appearanceColors[2], icon: appearanceIcons[3] }

      const { result } = renderHook(() => useAppearancePicker())

      expect(result.current.selectedColor).toBe(appearanceColors[2])
      expect(result.current.selectedIcon).toBe(appearanceIcons[3])
    })

    it('should ignore invalid params and use the defaults', () => {
      mockParams = { color: '#NOPE', icon: 'not-an-icon' }

      const { result } = renderHook(() => useAppearancePicker())

      expect(result.current.selectedColor).toBe(defaultAppearanceColor)
      expect(result.current.selectedIcon).toBe(defaultAppearanceIcon)
    })
  })

  describe('selection', () => {
    it('should update the selected color and icon', () => {
      const { result } = renderHook(() => useAppearancePicker())

      act(() => {
        result.current.selectColor(appearanceColors[4])
        result.current.selectIcon(appearanceIcons[5])
      })

      expect(result.current.selectedColor).toBe(appearanceColors[4])
      expect(result.current.selectedIcon).toBe(appearanceIcons[5])
    })
  })

  describe('navigation', () => {
    it('should go back when closing', () => {
      const { result } = renderHook(() => useAppearancePicker())

      act(() => {
        result.current.handleClose()
      })

      expect(mockedBack).toHaveBeenCalled()
    })

    it('should navigate to the default route with the selection on save', () => {
      const { result } = renderHook(() => useAppearancePicker())

      act(() => {
        result.current.selectColor(appearanceColors[1])
        result.current.selectIcon(appearanceIcons[1])
      })

      act(() => {
        result.current.handleSave()
      })

      expect(mockedNavigate).toHaveBeenCalledWith({
        pathname: '/instituicao/nova',
        params: { color: appearanceColors[1], icon: appearanceIcons[1] },
      })
    })

    it('should navigate to returnTo and forward the name when provided', () => {
      mockParams = { returnTo: '/instituicao/inst-1', name: 'Nubank' }

      const { result } = renderHook(() => useAppearancePicker())

      act(() => {
        result.current.handleSave()
      })

      expect(mockedNavigate).toHaveBeenCalledWith({
        pathname: '/instituicao/inst-1',
        params: {
          color: defaultAppearanceColor,
          icon: defaultAppearanceIcon,
          name: 'Nubank',
        },
      })
    })
  })
})
