import { useCallback, useState } from 'react';

import createNewProgress from '../utils/createNewProgress';

import { useProgressRepository } from './useProgressRepository';

import { Card } from '@shared/store/useCardsStore';
import { Progress, useProgressStore } from '@shared/store/useProgressStore';
import updateSrs, { Rating, RATING_MAPPER } from '@shared/utils/updateSrs';
import { useUserStore } from '@shared/store/useUserStore';

const getTimeProgress = (progress: Progress): number => {
  if (!progress?.nextReview) return 0;
  return new Date(progress.nextReview).getTime();
};

const getSortedCards = (
  cards: Card[],
  progressByCardId: Record<number, Progress>,
) => {
  const now = new Date();

  const dueCards = cards.filter((card) => {
    const progress = progressByCardId[card.id];
    if (!progress) return true;
    if (!progress.nextReview) return true;
    return new Date(progress.nextReview) <= now;
  });

  const cardsToReview = dueCards.length > 0 ? dueCards : cards;

  return cardsToReview.sort((cardA, cardB) => {
    const nextReviewA = getTimeProgress(progressByCardId[cardA.id]);
    const nextReviewB = getTimeProgress(progressByCardId[cardB.id]);

    return nextReviewA - nextReviewB;
  });
};

const pushCardToEnd = (cards: Card[], index: number) => {
  const newCards = [...cards];
  const [removed] = newCards.splice(index, 1);
  newCards.push(removed);
  return newCards;
};

const useReview = (initialCards: Card[]) => {
  const { progressByCardId } = useProgressStore();
  const { saveProgressLocally } = useProgressRepository();
  const { user } = useUserStore();

  const [index, setIndex] = useState<number>(0);

  const [reviewCards, setReviewCards] = useState<Card[]>(() => {
    const sortedCards = getSortedCards(initialCards, progressByCardId);
    return [...sortedCards];
  });

  const currentCard = reviewCards[index];

  const markCard = useCallback(
    async (rating: Rating) => {
      if (!currentCard) return;

      let progress = progressByCardId[currentCard.id];

      if (!progress) {
        progress = createNewProgress(currentCard.id, Number(user?.id));
      }

      const newSrc = updateSrs(progress, rating);

      const updatedProgress: Progress = {
        ...progress,
        ...newSrc,
        dirty: true,
      };

      await saveProgressLocally(updatedProgress);

      if (rating === RATING_MAPPER.again) {
        setReviewCards((prev) => pushCardToEnd(prev, index));
      } else {
        setIndex((prev) => prev + 1);
      }
    },
    [currentCard, progressByCardId, saveProgressLocally, user?.id, index],
  );

  const hasMore = index < reviewCards.length;

  return {
    currentCard,
    hasMore,
    markCard,
    setIndex,
  };
};

export default useReview;
