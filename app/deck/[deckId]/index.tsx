import React from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';

import { ThemedView } from '@shared/components/ui/ThemedView';
import CardsDataContent from '@features/decks/components/CardsDataContent';
import CardsWaveButton from '@features/decks/components/CardsWaveButton';
import BlurModal from '@shared/components/modal/BlurModal';
import KeyboardAvoidingContainer from '@shared/components/KeyboardAvoidingContainer';
import DeckSettings from '@features/decks/components/DeckSettings';
import { useSelectStore } from '@shared/store/useSelectStore';
import { Text } from '@shared/components/ui/ThemedText';
import DeckHeaderButton from '@features/decks/components/DeckHeaderButton';
// import TestingFlat from '@shared/components/TestingFlat';

function HeaderTitle({ name }: { name: string }) {
  const { selectedCards, selectCard } = useSelectStore();

  if (selectedCards.length > 0) {
    return <Text variant="titleMedium">Selected {selectedCards.length}</Text>;
  }

  return <Text variant="titleMedium">{name}</Text>;
}

const DeckPage = () => {
  const { name, deckId } = useLocalSearchParams<{
    name: string;
    deckId: string;
  }>();
  if (typeof deckId === 'undefined') {
    return null;
  }

  console.log('DeckPage rerender');

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: () => <HeaderTitle name={name} />,
          headerRight: () => <DeckHeaderButton />,
          headerBackTitle: '',
          headerLeft: (props) => (
            <HeaderBackButton
              style={styles.button}
              {...props}
              onPress={() => router.back()}
            />
          ),
        }}
      />
      <View style={{ flex: 1, position: 'relative' }}>
        <KeyboardAvoidingContainer>
          <DeckSettings />
          {/* <TestingFlat /> */}
          <CardsDataContent />
        </KeyboardAvoidingContainer>
        <CardsWaveButton href={`/deck/${deckId}/card/create?action=add`} />
      </View>
      <BlurModal />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginLeft: -16,
  },
  container: {
    flex: 1,
  },
});

export default DeckPage;
