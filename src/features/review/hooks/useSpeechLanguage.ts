import { useLocalSearchParams } from 'expo-router';

import { useCategoriesStore } from '@shared/store/useCategoriesStore';

const useSpeechLanguage = () => {
  const { decksById } = useCategoriesStore();
  const { deckId } = useLocalSearchParams<{ deckId: string }>();

  return {
    frontLanguage: decksById[Number(deckId)].frontLanguage,
    backLanguage: decksById[Number(deckId)].backLanguage,
  };
};

export default useSpeechLanguage;
