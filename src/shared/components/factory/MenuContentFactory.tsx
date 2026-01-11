import React from 'react';

import CardModalMenuContent from '../modal/CardModalMenuContent';
import DeckModalMenuContent from '../modal/DeckModalMenuContent';

import { useModalStore } from '@shared/store/useModalStore';
import CategoryModalMenuContent from '@features/categories/components/CategoryModalMenuContent';

const CONTENT_COMPONENTS = {
  CATEGORY: CategoryModalMenuContent,
  DECK: DeckModalMenuContent,
  CARD: CardModalMenuContent,
};

export default function MenuContentFactory() {
  const { selectedItem } = useModalStore();

  const ContentComponent = selectedItem
    ? CONTENT_COMPONENTS[selectedItem.type]
    : null;
  return ContentComponent ? <ContentComponent /> : null;
}
