import React from 'react';

import CardModalMenuContent from '../modal/CardModalMenuContent';
import DeckModalMenuContent from '../modal/DeckModalMenuContent';

import { useModalStore } from '@shared/store/useModalStore';
import CategoryModalMenuContent from '@features/categories/components/CategoryModalMenuContent';

export default function MenuContentFactory() {
  const { selectedItem } = useModalStore();

  if (!selectedItem) {
    return null;
  }

  switch (selectedItem.type) {
    case 'CATEGORY':
      return <CategoryModalMenuContent />;
    case 'DECK':
      return <DeckModalMenuContent />;
    case 'CARD':
      return <CardModalMenuContent />;
    default:
      return null;
  }
}
