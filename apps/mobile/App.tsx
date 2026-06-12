import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { ThemedText } from '@/components/ui/ThemedText'

export default function App() {
  return (
    <View style={styles.container}>
      <ThemedText text="Open up App.tsx to start working on your app!" variant="body" />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
