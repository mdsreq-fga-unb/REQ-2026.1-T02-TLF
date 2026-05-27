import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    width: '100%',
    alignSelf: 'stretch',
  },
  cardActed: {
    opacity: 0.55,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cardBody: {
    flex: 1,
    gap: 5,
    minWidth: 0,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  cardName: {
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    flexShrink: 0,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  cardMeta: {
    fontSize: 12,
    fontWeight: '400',
  },
  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  cardAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
  btnGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
  },
  btnConfirmText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F0F13',
  },
  btnSkip: {
    borderWidth: 1,
  },
  btnSkipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  btnUndo: {
    borderWidth: 1,
  },
  btnUndoText: {
    fontSize: 12,
    fontWeight: '600',
  },
})
