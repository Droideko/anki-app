import React from 'react';
import { StyleSheet } from 'react-native';

import ScrollView from '@shared/components/ScrollView';
import { ThemedView } from '@shared/components/ui/ThemedView';
import Search from '@shared/components/Search';
import WaveButton from '@shared/components/WaveButton';
import CategoryDataContent from '@features/categories/components/CategoryDataContent';

export default function CategoriesScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Search />
        <CategoryDataContent />
      </ScrollView>
      <WaveButton href="/categories/create-category" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
});
