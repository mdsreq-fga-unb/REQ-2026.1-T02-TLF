import { View, ViewProps } from 'react-native'
import { styles } from './style'

type props = ViewProps & {
  percentage: number
  backColor: string
  fillColor: string
}

export function ProgressBar({ percentage, backColor, fillColor }: props) {
  return (
    <View style={[styles.outerBar, { backgroundColor: backColor }]}>
      <View style={[styles.fillBar, { backgroundColor: fillColor, width: `${percentage}%` }]} />
    </View>
  )
}
