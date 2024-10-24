import React from 'react';
import { ActivityIndicator } from 'react-native-paper';

import { useThemeColor } from '@shared/hooks/useThemeColor';

function LoadingIndicator() {
  const { primary } = useThemeColor();

  return <ActivityIndicator animating={true} color={primary} />;
}

export default LoadingIndicator;
