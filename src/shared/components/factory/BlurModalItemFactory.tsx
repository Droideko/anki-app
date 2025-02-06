import React from 'react';
import { ViewStyle } from 'react-native';

import CardModalItem from '../modal/CardModalItem';

import { useModalStore } from '@shared/store/useModalStore';
import SubcategoryCard from '@shared/components/modal/SubcategoryCard';

/**
 * Общий компонент, который выбирает конкретный «Item»-компонент
 * в зависимости от selectedItem.type
 */
export default function BlurModalItemFactory() {
  const { elementPosition, selectedItem } = useModalStore();

  if (!selectedItem || !elementPosition) {
    return null;
  }

  const positionStyle: ViewStyle = {
    position: 'absolute',
    top: elementPosition.y,
    left: elementPosition.x,
    width: elementPosition.width,
    height: elementPosition.height,
  };

  switch (selectedItem.type) {
    case 'CATEGORY':
      // TODO: CategoryModalItem
      return <SubcategoryCard item={selectedItem} style={positionStyle} />;
    case 'DECK':
      // TODO: DeckModalItem
      return <SubcategoryCard item={selectedItem} style={positionStyle} />;
    case 'CARD':
      return <CardModalItem item={selectedItem} />;
    default:
      return null;
  }
}
