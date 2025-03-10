import React from 'react';

import CategorySettingsButton from '@features/categories/components/CategorySettingsButton';
import { Text } from '@shared/components/ui/ThemedText';
import { useSelectStore } from '@shared/store/useSelectStore';
import { useThemeColor } from '@shared/hooks/useThemeColor';

export default function DeckHeaderButton() {
  const { primary } = useThemeColor();
  const { selectedCards, clearCards } = useSelectStore();

  if (selectedCards.length > 0) {
    return (
      <Text
        onPress={clearCards}
        style={{ color: primary }}
        variant="titleMedium"
      >
        Cancel
      </Text>
    );
  }

  return <CategorySettingsButton />;
}
