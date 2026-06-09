import { StyleSheet } from 'react-native'
import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { ThemedText } from '@/components/ui/ThemedText'

export default function home() {
  return (
    //TODO: add a logout button and make the logout function
    <ThemedBackground>
      <ThemedText variant="headline" style={styles.text} text="Test" />
    </ThemedBackground>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    color: 'brown',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
