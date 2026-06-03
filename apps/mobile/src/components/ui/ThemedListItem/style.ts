import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    gap: 10,
  },
  filledRightContainer: {
    paddingLeft: 15,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 1000,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 1000,
  },
  filledLeftContainer: {
    borderTopLeftRadius: 1000,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 40,
  },
  squareWrap: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  roundWrap: {
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
})
