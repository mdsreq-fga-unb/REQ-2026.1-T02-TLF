import { spacing } from '@/utils/dimensions'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 0,
    gap: spacing.xs,
    alignItems: 'center',
  },
  text: {
    textAlign: 'left',
    flex: 1,
  },
})
