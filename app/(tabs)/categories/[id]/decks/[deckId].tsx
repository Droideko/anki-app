import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

import { ThemedView } from '@shared/components/ui/ThemedView';
import { useThemeColor } from '@shared/hooks/useThemeColor';
// import SubcategoryDataContent from '@features/categories/components/SubcategoryDataContent';
import WaveButton from '@shared/components/WaveButton';
import ScrollView from '@shared/components/ScrollView';
// import Search from '@shared/components/Search';

const DeckPage = () => {
  const { id, name, deckId } = useLocalSearchParams<{
    id: string;
    name: string;
    deckId: string;
  }>();
  const { primary } = useThemeColor();

  console.log(useLocalSearchParams());

  if (typeof id === 'undefined' || typeof deckId === 'undefined') {
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
        {/* <Search />
        <SubcategoryDataContent /> */}
      </ScrollView>
      <WaveButton href={`/categories/${id}/decks/${deckId}/create-card`} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
});

export default DeckPage;
