import React from 'react';
import { router } from 'expo-router';

import ThemedButton from '@shared/components/ui/ThemedButton';
import { Text } from '@shared/components/ui/ThemedText';
import { useThemeColor } from '@shared/hooks/useThemeColor';
import { useReviewStore } from '@shared/store/useReviewStore';
import { useCardsRepository } from '@features/decks/hooks/useCardsRepository';

export default function ReviewDeleteCard() {
  const { error } = useThemeColor();

  const { removeCard } = useCardsRepository();

  const currentCardId = useReviewStore((state) => state.currentCardId);
  const setChangedCard = useReviewStore((state) => state.setChangedCard);

  const handleDelete = async () => {
    await removeCard(Number(currentCardId));
    setChangedCard(String(currentCardId), { isDeleted: true });
    router.back();
  };

  return (
    <ThemedButton
      mode="outlined"
      textColor={error}
      style={{ borderColor: error }}
      onPress={handleDelete}
    >
      <Text>Delete Card</Text>
    </ThemedButton>
  );
}
