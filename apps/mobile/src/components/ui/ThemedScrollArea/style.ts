import { spacing } from '@/utils/dimensions'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  scrollRoot: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingBottom: spacing.lg,
  },
})
