import { component, layout, spacing } from '@/utils/dimensions'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  inputForm: {
    flexDirection: 'row',
    width: '100%',
    minHeight: layout.minTouchTarget,
    paddingHorizontal: component.inputPaddingHorizontal,
    gap: spacing.xs,
    borderRadius: component.inputRadius,
    borderWidth: 1,
    alignItems: 'center',
  },
  iconWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: spacing.xs,
    textAlign: 'left',
  },
})
