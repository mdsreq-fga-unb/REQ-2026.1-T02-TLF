import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    width: '100%',
    alignSelf: 'stretch',
    gap: 24,
  },
  cardActed: {
    opacity: 0.55,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  textBlock: {
    flex: 1,
    minWidth: 0,
    alignItems: 'flex-start',
  },
  cardName: {
    fontSize: 15,
    fontWeight: '700',
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
  cardAmount: {
    fontSize: 14,
    fontWeight: '700',
    flexShrink: 0,
    textAlign: 'right',
  },
  btnGroup: {
    flexDirection: 'row',
    gap: 8,
    alignSelf: 'stretch',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
  },
  btnFill: {
    flex: 1,
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
    alignSelf: 'stretch',
  },
  btnUndoText: {
    fontSize: 12,
    fontWeight: '600',
  },
})
