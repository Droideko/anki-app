import React from 'react';
import { Stack } from 'expo-router';

import useStackScreenOptions from '@shared/hooks/useStackScreenOptions';
import { useThemeColor } from '@shared/hooks/useThemeColor';

export const ReviewLayout = () => {
  const { text, secondaryBackground } = useThemeColor();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: secondaryBackground,
        },
        headerTintColor: text,
      }}
    />
  );
};

export default ReviewLayout;
