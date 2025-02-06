import React from 'react';
import { StyleSheet } from 'react-native';

import { ThemedView } from '@shared/components/ui/ThemedView';
import CategoriesScrollView from '@features/categories/components/CategoriesScrollView';
import CategoriesWaveButton from '@features/categories/components/CategoriesWaveButton';
import CategoryDataContent from '@features/categories/components/CategoryDataContent';

export default function CategoriesPage() {
  return (
    <>
      {/* <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Categories',
        }}
      /> */}
      <ThemedView style={styles.container}>
        <CategoriesScrollView>
          <CategoryDataContent />
        </CategoriesScrollView>
        <CategoriesWaveButton href="/categories/create-category" />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
