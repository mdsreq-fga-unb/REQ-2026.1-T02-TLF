import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  card: {
    gap: 12,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    alignSelf: 'stretch',
  },
  dayRow: {
    alignItems: 'flex-start',
  },
  dayBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '700',
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  leftContent: {
    flex: 1,
    minWidth: 0,
    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  content: {
    flex: 1,
    minWidth: 0,
    alignItems: 'flex-start',
  },
  description: {
    fontSize: 15,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '400',
  },
  amount: {
    fontSize: 14,
    fontWeight: '700',
    flexShrink: 0,
  },
})
