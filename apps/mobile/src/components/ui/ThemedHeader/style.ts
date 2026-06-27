import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
    padding: 10,
    left: 0,
    right: 0,
  },
  brandWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  actionsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconWrap: {
    flex: 0,
    padding: 10,
    borderRadius: 10000,
  },
})
