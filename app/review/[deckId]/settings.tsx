import React from 'react';
import { StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Card, Divider, Switch } from 'react-native-paper';

import KeyboardAvoidingContainer from '@shared/components/KeyboardAvoidingContainer';
import { ThemedView } from '@shared/components/ui/ThemedView';
import SelectLanguage from '@shared/components/SelectLanguage';
import { useCategoryRepository } from '@features/categories/hooks/useCategoryRepository';
import { CountriesName } from '@shared/types/language';
import {
  speechLanguages,
  speechLanguagesList,
} from '@shared/constants/language';
import { Text } from '@shared/components/ui/ThemedText';
import CustomSwitch from '@features/settings/components/CustomSwitch';
import ExampleSwitch from '@features/decks/components/ExampleSwitch';
import CardArrowLink from '@shared/components/Card/CardArrowLink';
import ThemedButton from '@shared/components/ui/ThemedButton';
import { useCategoriesStore } from '@shared/store/useCategoriesStore';
import { useCardsRepository } from '@features/decks/hooks/useCardsRepository';
import { useReviewStore } from '@shared/store/useReviewStore';
import ReverseSwitch from '@features/decks/components/ReverseSwitch';
import useSpeechLanguage from '@features/review/hooks/useSpeechLanguage';
import OnlyBackSwitch from '@features/decks/components/OnlyBackSwitch';
import VibrateSwitch from '@features/decks/components/VibrateSwitch';
import { useThemeColor } from '@shared/hooks/useThemeColor';
import ReviewDeleteCard from '@features/review/components/ReviewDeleteCard';

export default function Settings() {
  const { decksById } = useCategoriesStore();
  const { frontLanguage, backLanguage } = useSpeechLanguage();
  const { deckId } = useLocalSearchParams<{ deckId: string }>();

  const currentDeck = decksById[Number(deckId)];
  const fontSize = currentDeck?.fontSize ?? 16;

  return (
    <ThemedView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Repetition" />
        <Card.Content>
          <CardArrowLink
            icon="format-size"
            text="Font Size"
            href={`/review/${deckId}/font`}
            value={`${fontSize}px`}
          />
          <Divider style={{ marginVertical: 12 }} />
          <ReverseSwitch leftText="Reverse Card" />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Audio" />
        <Card.Content>
          <CardArrowLink
            icon="volume-high"
            text="Front Audio"
            href={`/review/${deckId}/language?type=front`}
            value={(frontLanguage && speechLanguagesList[frontLanguage]) || ''}
          />
          <Divider style={{ marginVertical: 12 }} />
          <CardArrowLink
            icon="volume-high"
            text="Back Audio"
            href={`/review/${deckId}/language?type=back`}
            value={(backLanguage && speechLanguagesList[backLanguage]) || ''}
          />
          <Divider style={{ marginVertical: 12 }} />
          <OnlyBackSwitch leftText="Audio only on Back" />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Editing" />

        <Card.Content>
          <CardArrowLink
            icon="pencil"
            text="Edit Card"
            href={`/review/${deckId}/edit`}
          />
          <Divider style={{ marginVertical: 12 }} />
          <VibrateSwitch leftText="Vibrate Feedback" />
          <Divider style={{ marginVertical: 12 }} />
          <Text variant="bodyLarge">Tags: </Text>

          <ReviewDeleteCard />
        </Card.Content>
      </Card>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 8,
  },
  card: {
    marginBottom: 10,
  },
  container: {
    flex: 1,
    padding: 12,
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingVertical: 8,
  },
  slider: {
    marginVertical: 8,
    width: '100%',
  },
});
