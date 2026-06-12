import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  projectionCard: {
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    alignSelf: 'stretch',
  },
  projectionIconWrap: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  projectionBody: {
    flex: 1,
    gap: 3,
  },
  projectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  projectionValue: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  projectionSub: {
    fontSize: 12,
    fontWeight: '400',
  },
})
