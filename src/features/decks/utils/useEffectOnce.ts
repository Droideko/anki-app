import { useCallback, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Card } from '@shared/store/useCardsStore';
import { useCategoriesStore } from '@shared/store/useCategoriesStore';
import { useDetectSoundStore } from '@shared/store/useDetectSoundStore';
import { useAsyncFn } from '@shared/hooks/useAsyncFn';
import { GenerateRequest, openaiService } from '@shared/api/openaiService';
import { useCategoryRepository } from '@features/categories/hooks/useCategoryRepository';
import { speechLanguages } from '@shared/constants/language';

const useEffectSoundLanguages = (cards: Card[]) => {
  const { decksById } = useCategoriesStore();
  const { deckId } = useLocalSearchParams<{ deckId: string }>();
  const { updateDeck } = useCategoryRepository();

  const backLanguage = decksById[Number(deckId)]?.backLanguage;
  const frontLanguage = decksById[Number(deckId)]?.frontLanguage;

  const { isCheck, isReverseCard, resetCheck, resetReverseCard } =
    useDetectSoundStore();

  const [_, detectLanguage] = useAsyncFn(
    async (data: { cards: GenerateRequest[] }) => {
      return openaiService.detectLanguage(data);
    },
  );

  const handleReverseCard = useCallback(async () => {
    const speechLangs = {
      frontLanguage: backLanguage,
      backLanguage: frontLanguage,
    };

    await updateDeck(Number(deckId), speechLangs);
    resetReverseCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backLanguage, frontLanguage, deckId, resetReverseCard]);

  useEffect(() => {
    if (isReverseCard) {
      handleReverseCard();
      return;
    }

    if (backLanguage || !cards?.length || !isCheck) {
      return;
    }

    async function fetchData() {
      const newCards = cards.map((card) => ({
        front: card.front,
        back: card.back,
      }));

      const languages = await detectLanguage({ cards: newCards });

      const speechLangs = {
        frontLanguage: speechLanguages[languages.frontLanguage],
        backLanguage: speechLanguages[languages.backLanguage],
      };

      await updateDeck(Number(deckId), speechLangs);
      resetCheck();
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck, resetCheck, cards, backLanguage, isReverseCard]);
};

export default useEffectSoundLanguages;
