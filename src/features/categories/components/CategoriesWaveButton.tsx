import React, { useMemo } from 'react';
import { Href, useLocalSearchParams } from 'expo-router';

import { useCategoriesStore } from '@shared/store/useCategoriesStore';
import WaveButton from '@shared/components/WaveButton';

interface CategoriesWaveButtonProps {
  href: Href;
}

function CategoriesWaveButton({ href }: CategoriesWaveButtonProps) {
  const { rootCategoryIds, categoriesById, decksById } = useCategoriesStore();
  const params = useLocalSearchParams<{ id?: string }>();

  const categoryId = params.id ? Number(params.id) : null;

  const isActivePulse = useMemo(() => {
    if (categoryId === null) {
      const hasRootDeck = Object.values(decksById).some(
        (deck) => deck.categoryId === null,
      );

      return rootCategoryIds.length === 0 && !hasRootDeck;
    }

    const hasSubcategories = Object.values(categoriesById).some(
      (category) => category.parentId === categoryId,
    );

    const hasDecks = Object.values(decksById).some(
      (deck) => deck.categoryId === categoryId,
    );

    return !(hasSubcategories || hasDecks);
  }, [categoryId, rootCategoryIds, categoriesById, decksById]);

  return <WaveButton href={href} isActivePulse={isActivePulse} />;
}

export default CategoriesWaveButton;
