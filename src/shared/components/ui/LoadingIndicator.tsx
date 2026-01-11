import React from 'react';
// import { ActivityIndicator } from 'react-native-paper';
import { ActivityIndicator } from 'react-native';

import { useThemeColor } from '@shared/hooks/useThemeColor';

export default function LoadingIndicator() {
  const { primary } = useThemeColor();

  return <ActivityIndicator animating={true} color={primary} />;
}
