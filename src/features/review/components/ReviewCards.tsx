import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';

import useReview from '../hooks/useReview';
import useSpeechLanguage from '../hooks/useSpeechLanguage';

import ReviewShowAnswer from './ReviewShowAnswer';
import ReviewCompletedPage from './ReviewCompleted';
import ReviewSpeechCard from './ReviewSpeechCard';

import { Text } from '@shared/components/ui/ThemedText';
import { Card } from '@shared/store/useCardsStore';
import { useCategoriesStore } from '@shared/store/useCategoriesStore';
import { useReviewStore } from '@shared/store/useReviewStore';

interface ReviewCardsProps {
  cards: Card[];
}

const minHeight = 245;

export default function ReviewCards({ cards }: ReviewCardsProps) {
  const { currentCard, hasMore, markCard, setIndex } = useReview(cards);
  const [showAnswer, setShowAnswer] = useState(false);
  const { frontLanguage, backLanguage } = useSpeechLanguage();
  const { deckId } = useLocalSearchParams<{ deckId: string }>();
  const { decksById } = useCategoriesStore();

  const setCurrentCardId = useReviewStore((state) => state.setCurrentCardId);
  const changedCards = useReviewStore((state) => state.changedCards);
  const currentChangedCard = changedCards[String(currentCard?.id) ?? ''];
  const isDeleted = currentChangedCard?.isDeleted ?? false;

  const { fontSize, showOnlyBackSound } = decksById[Number(deckId)];

  useEffect(() => {
    if (currentCard?.id) {
      setCurrentCardId(currentCard.id.toString());
    }
  }, [currentCard, setCurrentCardId]);

  useEffect(() => {
    if (isDeleted) {
      setIndex((index) => index + 1);
    }
  }, [currentCard, isDeleted, setIndex]);

  if (!hasMore) {
    return <ReviewCompletedPage />;
  }

  const isReversedCard = currentChangedCard?.isReversed ?? false;
  const changedFront = currentChangedCard?.front || currentCard?.front;
  const changedBack = currentChangedCard?.back || currentCard?.back;

  const frontCard = isReversedCard ? changedBack : changedFront;
  const backCard = isReversedCard ? changedFront : changedBack;

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.blocksWrapper}>
          <View style={[styles.topBlock, { minHeight }]}>
            <Text style={[styles.text, { fontSize }]}>{frontCard}</Text>
            {!showOnlyBackSound && (
              <ReviewSpeechCard
                key={`${frontCard}_${frontLanguage}`}
                type="front"
                text={frontCard}
                style={styles.soundButtonTop}
                languageCode={frontLanguage}
              />
            )}
          </View>
          <Divider style={styles.divider} />
          <View style={[styles.bottomBlock, { minHeight }]}>
            {showAnswer && (
              <>
                <Text style={[styles.text, { fontSize }]}>{backCard}</Text>
                <ReviewSpeechCard
                  key={`${backCard}_${backLanguage}`}
                  type="back"
                  text={backCard}
                  style={styles.soundButtonBottom}
                  languageCode={backLanguage}
                />
              </>
            )}
          </View>
        </View>
      </ScrollView>
      <ReviewShowAnswer
        showAnswer={showAnswer}
        setShowAnswer={setShowAnswer}
        markCard={markCard}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  blocksWrapper: {
    flex: 1,
    width: '100%',
  },
  bottomBlock: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    position: 'relative',
  },
  container: {
    flex: 1,
  },
  divider: {
    alignSelf: 'stretch',
    marginVertical: 8,
  },
  scrollContent: {
    flexGrow: 1,
  },
  soundButtonBottom: {
    position: 'absolute',
    right: -5,
    top: -10,
  },
  soundButtonTop: {
    bottom: -10,
    position: 'absolute',
    right: -5,
  },
  text: {
    textAlign: 'center',
  },
  topBlock: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
    position: 'relative',
  },
});

// export default function ReviewCards({ cards }: ReviewCardsProps) {
//   const { currentCard, hasMore, markCard } = useReview(cards);
//   const [showAnswer, setShowAnswer] = useState(false);
//   const { frontLanguage, backLanguage } = useSpeechLanguage();
//   const { deckId } = useLocalSearchParams<{ deckId: string }>();
//   const { decksById } = useCategoriesStore();

//   const { fontSize } = decksById[Number(deckId)];

//   if (!hasMore) {
//     return <ReviewCompletedPage />;
//   }

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         style={{ flex: 1 }}
//         contentContainerStyle={{
//           flexGrow: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <View style={styles.topBlock}>
//           <Text style={[styles.text, { fontSize }]}>{currentCard.front}</Text>
//           <ReviewSpeechCard
//             key={currentCard.front}
//             type="front"
//             text={currentCard.front}
//             style={styles.soundButtonTop}
//             languageCode={frontLanguage}
//           />
//         </View>
//         <Divider style={{ width: '100%' }} />
//         <View style={styles.bottomBlock}>
//           {showAnswer && (
//             <>
//               <Text style={[styles.text, { fontSize }]}>
//                 {currentCard.back}
//               </Text>
//               <ReviewSpeechCard
//                 type="back"
//                 text={currentCard.back}
//                 style={styles.soundButtonBottom}
//                 languageCode={backLanguage}
//               />
//             </>
//           )}
//         </View>
//       </ScrollView>
//       <ReviewShowAnswer
//         showAnswer={showAnswer}
//         setShowAnswer={setShowAnswer}
//         markCard={markCard}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   bottomBlock: {
//     flex: 4.5,
//     marginTop: 16,
//     position: 'relative',
//   },
//   container: {
//     flex: 1,
//   },
//   soundButtonBottom: {
//     margin: 0,
//     position: 'absolute',
//     right: -5,
//     top: -10,
//   },
//   soundButtonTop: {
//     bottom: -10,
//     margin: 0,
//     position: 'absolute',
//     right: -5,
//   },
//   text: {
//     paddingHorizontal: 30,
//     textAlign: 'center',
//   },
//   topBlock: {
//     flex: 4.5,
//     justifyContent: 'flex-end',
//     marginBottom: 16,
//     position: 'relative',
//   },
// });
