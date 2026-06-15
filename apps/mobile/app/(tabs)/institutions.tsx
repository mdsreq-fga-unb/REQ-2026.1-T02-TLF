import { StyleSheet, View } from 'react-native'
import { router } from 'expo-router'
import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { ThemedScrollArea } from '@/components/ui/ThemedScrollArea'
import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedButton } from '@/components/ui/ThemedButton'
import { RecordsSearch } from '@/components/finance/records/RecordsSearch'
import { InstitutionsHeader } from '@/components/finance/institutions/InstitutionsHeader'
import { InstitutionsList } from '@/components/finance/institutions/InstitutionsList'
import { InstitutionDeleteModals } from '@/components/finance/institutions/InstitutionDeleteModals'
import { useInstitutionsScreen } from '@/hooks/institutions/useInstitutionsScreen'
import { spacing } from '@/utils/dimensions'

export default function InstitutionsScreen() {
  const {
    institutions,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    isSearchOpen,
    toggleSearch,
    handleOpen,
    handleCreate,
    handleDelete,
    confirmVisible,
    confirmDelete,
    cancelDelete,
    blockedVisible,
    dismissBlocked,
  } = useInstitutionsScreen()

  return (
    <ThemedBackground>
      <ThemedScrollArea contentContainerStyle={styles.content}>
        <InstitutionsHeader
          isSearchOpen={isSearchOpen}
          onBack={() => router.back()}
          onToggleSearch={toggleSearch}
        />

        <View style={styles.titleBlock}>
          <ThemedText text="Instituições" variant="headline" style={styles.title} />
          <ThemedText
            text="Gerencie suas instituições"
            variant="caption"
            tone="muted"
            style={styles.subtitle}
          />
        </View>

        {isSearchOpen ? (
          <RecordsSearch
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar instituição"
          />
        ) : null}

        <InstitutionsList
          institutions={institutions}
          isLoading={isLoading}
          error={error}
          onEditInstitution={handleOpen}
          onDeleteInstitution={handleDelete}
        />

        <ThemedButton title="Nova Instituição" onPress={handleCreate} style={styles.addButton} />
      </ThemedScrollArea>

      <InstitutionDeleteModals
        confirmVisible={confirmVisible}
        onConfirmDelete={confirmDelete}
        onCancelDelete={cancelDelete}
        blockedVisible={blockedVisible}
        onViewAccounts={dismissBlocked}
        onDismissBlocked={dismissBlocked}
      />
    </ThemedBackground>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 18,
    paddingBottom: 28,
    gap: spacing.md,
    alignItems: 'stretch',
  },
  titleBlock: {
    width: '100%',
    gap: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
  },
  addButton: {
    width: '100%',
    height: 56,
    marginTop: 0,
  },
})
