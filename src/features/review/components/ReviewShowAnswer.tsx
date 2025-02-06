import React from 'react';
import { StyleSheet, View } from 'react-native';

import ThemedButton from '@shared/components/ui/ThemedButton';
import { Text } from '@shared/components/ui/ThemedText';
import { RATING_MAPPER, Rating } from '@shared/utils/updateSrs';

interface ReviewShowAnswerProps {
  showAnswer: boolean;
  setShowAnswer: (showAnswer: boolean) => void;
  markCard: (ease: Rating) => void;
}

function ReviewShowAnswer({
  showAnswer,
  setShowAnswer,
  markCard,
}: ReviewShowAnswerProps) {
  if (!showAnswer) {
    return (
      <ThemedButton onPress={() => setShowAnswer(true)}>
        <Text>Show Answer</Text>
      </ThemedButton>
    );
  }

  return (
    <View style={styles.container}>
      <ThemedButton
        compact
        style={styles.button}
        onPress={() => {
          markCard(RATING_MAPPER.again);
          setShowAnswer(false);
        }}
      >
        <Text>Again</Text>
      </ThemedButton>
      <ThemedButton
        compact
        style={styles.button}
        onPress={() => {
          markCard(RATING_MAPPER.hard);
          setShowAnswer(false);
        }}
      >
        <Text style={{ padding: 0 }}>Hard</Text>
      </ThemedButton>
      <ThemedButton
        compact
        style={styles.button}
        onPress={() => {
          markCard(RATING_MAPPER.good);
          setShowAnswer(false);
        }}
      >
        <Text>Good</Text>
      </ThemedButton>
      <ThemedButton
        compact
        style={styles.button}
        onPress={() => {
          markCard(RATING_MAPPER.easy);
          setShowAnswer(false);
        }}
      >
        <Text>Easy</Text>
      </ThemedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    marginTop: 0,
  },
  container: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 16,
  },
});

export default ReviewShowAnswer;
