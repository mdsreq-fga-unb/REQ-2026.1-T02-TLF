import { layout, radius, spacing } from '@/utils/dimensions'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    alignSelf: 'center',
    borderWidth: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: 0,
    gap: 0,
  },
  closeButton: {
    width: layout.minTouchTarget,
    height: layout.minTouchTarget,
    borderRadius: radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 0,
    gap: 0,
  },
  message: {
    textAlign: 'center',
    width: '100%',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
    width: '100%',
    padding: 0,
  },
  actionGrow: {
    flex: 1,
  },
})
