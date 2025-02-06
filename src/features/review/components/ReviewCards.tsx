import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';

import useReview from '../hooks/useReview';

import ReviewShowAnswer from './ReviewShowAnswer';
import ReviewCompletedPage from './ReviewCompleted';

import { Text } from '@shared/components/ui/ThemedText';
import { Card } from '@shared/store/useCardsStore';

interface ReviewCardsProps {
  cards: Card[];
}

export default function ReviewCards({ cards }: ReviewCardsProps) {
  const { currentCard, hasMore, markCard } = useReview(cards);
  const [showAnswer, setShowAnswer] = useState(false);

  // const finishReview = async () => {
  //   await syncProgress();
  //   // navigation.goBack()...
  // };

  if (!hasMore) {
    return <ReviewCompletedPage />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBlock}>
        <Text variant="bodyLarge" style={styles.text}>
          {currentCard.front}
        </Text>
      </View>

      <Divider />

      <View style={styles.bottomBlock}>
        {showAnswer && (
          <Text variant="bodyLarge" style={styles.text}>
            {currentCard.back}
          </Text>
        )}
      </View>

      <ReviewShowAnswer
        showAnswer={showAnswer}
        setShowAnswer={setShowAnswer}
        markCard={markCard}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBlock: {
    flex: 4.5,
    marginTop: 16,
  },
  container: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
  },
  topBlock: {
    flex: 4.5,
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
});
