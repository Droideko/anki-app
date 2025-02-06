import React from 'react';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

import { useThemeColor } from '@shared/hooks/useThemeColor';

const CARD_HEIGHT = 113; // Примерная высота карточки
const CARD_WIDTH = '42.5%'; // Примерная ширина карточки
const TITLE_HEIGHT = 16; // Примерная высота заголовка

const DeckSkeleton = () => {
  const { surfaceVariant, surfaceDisabled } = useThemeColor();

  return (
    <ContentLoader
      speed={2}
      width="100%"
      height={550}
      backgroundColor={surfaceVariant}
      foregroundColor={surfaceDisabled}
      style={{ width: '100%' }}
    >
      <Rect x="16" y="20" rx="28" ry="28" width="90%" height="52" />

      <Rect
        x="16"
        y="92"
        rx="8"
        ry="8"
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
      />

      <Rect
        x="194"
        y="92"
        rx="8"
        ry="8"
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
      />

      {/* <Rect x="90%" y="480" rx="16" ry="16" width="48" height="48" /> */}
    </ContentLoader>
  );
};

export default DeckSkeleton;

// 102 ->
