import { Text, View, StyleSheet } from 'react-native'

const app = () => {
  return (
    //TODO: add a logout button and make the logout function
    <View style={styles.container}>
      <Text style={styles.text}>testagem foda</Text>
    </View>
  )
}

export default app

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    color: 'brown',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
