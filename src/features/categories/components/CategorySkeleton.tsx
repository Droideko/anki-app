import React from 'react';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

import { useThemeColor } from '@shared/hooks/useThemeColor';

const CARD_HEIGHT = 70; // Примерная высота карточки
const CARD_WIDTH = '78%'; // Примерная ширина карточки
const TITLE_HEIGHT = 16; // Примерная высота заголовка

const CategorySkeleton = () => {
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
      <Rect x="0" y="0" rx="28" ry="28" width="100%" height="52" />

      <Rect x="0" y="80" rx="8" ry="8" width="50%" height={TITLE_HEIGHT} />
      <Rect
        x="0"
        y="102"
        rx="8"
        ry="8"
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
      />
      <Rect x="20" y="120" rx="8" ry="8" width="30" height="30" />
      <Rect x="76" y="125" rx="8" ry="8" width="40%" height="20" />

      <Rect x="0" y="193" rx="8" ry="8" width="50%" height={TITLE_HEIGHT} />
      <Rect
        x="0"
        y="215"
        rx="8"
        ry="8"
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
      />
      <Rect x="20" y="233" rx="8" ry="8" width="30" height="30" />
      <Rect x="76" y="238" rx="8" ry="8" width="40%" height="20" />

      <Rect x="0" y="306" rx="8" ry="8" width="50%" height={TITLE_HEIGHT} />
      <Rect
        x="0"
        y="328"
        rx="8"
        ry="8"
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
      />
      <Rect x="20" y="346" rx="8" ry="8" width="30" height="30" />
      <Rect x="76" y="351" rx="8" ry="8" width="40%" height="20" />

      {/* <Rect x="90%" y="480" rx="16" ry="16" width="48" height="48" /> */}
    </ContentLoader>
  );
};

export default CategorySkeleton;

// 102 ->
