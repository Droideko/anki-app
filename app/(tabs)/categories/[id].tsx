import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

import { ThemedView } from '@shared/components/ui/ThemedView';
import { useThemeColor } from '@shared/hooks/useThemeColor';
import SubcategoryDataContent from '@features/categories/components/SubcategoryDataContent';
import WaveButton from '@shared/components/WaveButton';
import ScrollView from '@shared/components/ScrollView';
import Search from '@shared/components/Search';

const CategoryPage = () => {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const { primary } = useThemeColor();

  if (typeof id === 'undefined') {
    return null;
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: `${name}`,
          headerRight: () => (
            <Ionicons color={primary} size={22} name={'filter'} />
          ),
        }}
      />

      <ScrollView style={styles.container}>
        <Search />
        <SubcategoryDataContent />
      </ScrollView>
      <WaveButton href={`/categories/${id}/create-deck-or-subcategory`} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
});

export default CategoryPage;
