import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { ThemedContainer } from '@/components/ui/ThemedContainer'
import { ThemedListItem } from '@/components/ui/ThemedListItem'
import { useCategory } from '@/hooks/category/useCategory'
import { useColors } from '@/hooks/useColors'
import { router, useFocusEffect } from 'expo-router'
import { useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

export default function CategoryScreen() {
  const { mappedCategories, loading } = useCategory()
  const { withOpacity } = useColors()

  useFocusEffect(useCallback(() => {}, []))

  return (
    <ThemedBackground>
      {/* <ThemedButton title="log" onPress={() => log()} /> */}

      {loading ? (
        <ActivityIndicator />
      ) : (
        <ThemedContainer variant="transparent" style={{ alignItems: 'flex-start' }}>
          <FlatList
            style={{ paddingTop: 10, width: '100%' }}
            data={mappedCategories}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 20, width: '100%', paddingBottom: 60 }}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
            renderItem={({ item }) => (
              <ThemedListItem
                text={item.name}
                variant="title"
                icon={item.iconComponent}
                start="left"
                iconColor={item.colorHex}
                iconSize="xlg"
                boxType="round"
                boxColor={withOpacity(item.colorHex, 0.17)}
                filled="filled"
                onPress={() => router.push(`/(category)/${item.id}`)}
              />
            )}
          />
        </ThemedContainer>
      )}
    </ThemedBackground>
  )
}
