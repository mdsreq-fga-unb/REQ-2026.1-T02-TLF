import { Pressable, ScrollView, View } from 'react-native'
import { ChevronLeft, X } from 'lucide-react-native'
import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedButton } from '@/components/ui/ThemedButton'
import { ColorSwatch } from '@/components/finance/institutions/ColorSwatch'
import { IconTile } from '@/components/finance/institutions/IconTile'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useAppearancePicker } from '@/hooks/institutions/useAppearancePicker'
import { styles } from './style'

export function AppearancePicker() {
  const theme = useThemeColor()
  const {
    colors,
    icons,
    selectedColor,
    selectedIcon,
    selectColor,
    selectIcon,
    handleClose,
    handleSave,
  } = useAppearancePicker()

  return (
    <ThemedBackground>
      <View style={styles.screen}>
        <View style={styles.header}>
          <Pressable
            onPress={handleClose}
            hitSlop={8}
            style={({ pressed }) => [
              styles.headerBtn,
              { backgroundColor: theme.surfaceMuted, opacity: pressed ? 0.6 : 1 },
            ]}
          >
            <ChevronLeft size={22} color={theme.foreground} />
          </Pressable>
          <ThemedText text="Selecionar Ícone e Cor" style={styles.headerTitle} />
          <Pressable
            onPress={handleClose}
            hitSlop={8}
            style={({ pressed }) => [
              styles.headerBtn,
              { backgroundColor: theme.surfaceMuted, opacity: pressed ? 0.6 : 1 },
            ]}
          >
            <X size={22} color={theme.foreground} />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.colorRow}
          >
            {colors.map((color) => (
              <ColorSwatch
                key={color}
                color={color}
                selected={color === selectedColor}
                onPress={() => selectColor(color)}
              />
            ))}
          </ScrollView>

          <View style={styles.iconGrid}>
            {icons.map((icon) => (
              <View key={icon} style={styles.iconCell}>
                <IconTile
                  icon={icon}
                  color={selectedColor}
                  selected={icon === selectedIcon}
                  onPress={() => selectIcon(icon)}
                />
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <ThemedButton title="Salvar" onPress={handleSave} style={{ width: '100%' }} />
        </View>
      </View>
    </ThemedBackground>
  )
}
