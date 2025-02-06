import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedView } from '@shared/components/ui/ThemedView';
import CategoryScrollView from '@features/categories/components/CategoryScrollView';
import CategoryWrapper from '@features/categories/components/CategoryWrapper';
import { useCategoriesStore } from '@shared/store/useCategoriesStore';
import CategorySegmentButtons from '@features/categories/components/CategorySegmentButtons';
import CategoriesWaveButton from '@features/categories/components/CategoriesWaveButton';

function HeaderRightButton({ id }: { id: number }) {
  const { categoriesById } = useCategoriesStore();

  const category = categoriesById[id];

  return (
    <>
      <CategorySegmentButtons item={category} hideMenu={{ viewAll: true }} />
    </>
  );
}

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
          headerRight: () => <HeaderRightButton id={Number(id)} />,
        }}
      />
      <CategoryScrollView>
        <CategoryWrapper />
      </CategoryScrollView>
      <CategoriesWaveButton
        href={`/categories/${id}/create-deck-or-subcategory`}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
