import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@shared/components/ui/ThemedText';
import { RATING_MAPPER, Rating } from '@shared/utils/updateSrs';
import HapticButton from '@shared/components/ui/HapticButton';

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
      <HapticButton onPress={() => setShowAnswer(true)}>
        <Text>Show Answer</Text>
      </HapticButton>
    );
  }

  const handlePress = (rating: Rating) => {
    markCard(rating);
    setShowAnswer(false);
  };

  return (
    <View style={styles.container}>
      <HapticButton
        compact
        style={styles.button}
        onPress={() => handlePress(RATING_MAPPER.again)}
      >
        <Text>Again</Text>
      </HapticButton>
      <HapticButton
        compact
        style={styles.button}
        onPress={() => handlePress(RATING_MAPPER.hard)}
      >
        <Text style={{ padding: 0 }}>Hard</Text>
      </HapticButton>
      <HapticButton
        compact
        style={styles.button}
        onPress={() => handlePress(RATING_MAPPER.good)}
      >
        <Text>Good</Text>
      </HapticButton>
      <HapticButton
        compact
        style={styles.button}
        onPress={() => handlePress(RATING_MAPPER.easy)}
      >
        <Text>Easy</Text>
      </HapticButton>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    marginBottom: 0,
    marginTop: 0,
  },
  container: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 16,
  },
});

export default ReviewShowAnswer;
