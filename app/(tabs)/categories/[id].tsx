import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedView } from '@shared/components/ui/ThemedView';
// import CategorySegmentButtons from '@features/categories/components/CategorySegmentButtons';
import CategoriesWaveButton from '@features/categories/components/CategoriesWaveButton';
import SubcategoryDataContent from '@features/categories/components/SubcategoryDataContent';
import KeyboardAvoidingContainer from '@shared/components/KeyboardAvoidingContainer';
import CategorySettingsButton from '@features/categories/components/CategorySettingsButton';
import CategorySettings from '@features/categories/components/CategorySettings';

export default function CategoryPage() {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();

  if (typeof id === 'undefined') {
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: `${name}`,
          headerRight: () => <CategorySettingsButton />,
        }}
      />
      <KeyboardAvoidingContainer>
        <CategorySettings />
        <SubcategoryDataContent />
      </KeyboardAvoidingContainer>
      <CategoriesWaveButton
        href={`/categories/${id}/create-deck-or-subcategory`}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});
