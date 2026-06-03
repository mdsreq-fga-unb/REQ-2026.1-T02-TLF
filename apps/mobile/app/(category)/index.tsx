import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { ThemedContainer } from '@/components/ui/ThemedContainer'
import { ThemedListItem } from '@/components/ui/ThemedListItem'
import { useCategory } from '@/hooks/category/useCategory'
import { useColors } from '@/hooks/useColors'
import { router } from 'expo-router'
import { FlatList } from 'react-native-gesture-handler'

export default function CategoryScreen() {
  const { CATEGORYS } = useCategory()
  const { withOpacity } = useColors()
  return (
    <ThemedBackground>
      <ThemedContainer variant="transparent" style={{ alignItems: 'flex-start' }}>
        <FlatList
          style={{ paddingTop: 10, width: '100%' }}
          data={CATEGORYS}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 20, width: '100%' }}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          renderItem={({ item }) => (
            <ThemedListItem
              text={item.name}
              variant="title"
              icon={item.icon.Icon}
              start="left"
              iconColor={item.color.color}
              iconSize="xxlg"
              boxType="round"
              boxColor={withOpacity(item.color.color, 0.17)}
              filled="filled"
              onPress={() => router.push(`/(category)/${item.id}`)}
            />
          )}
        />
      </ThemedContainer>
    </ThemedBackground>
  )
}
