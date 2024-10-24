import React from 'react';
import { Text as DefaultText, TextProps } from 'react-native-paper';

import { useThemeColor } from '@shared/hooks/useThemeColor';

export function Text({ style, ...rest }: TextProps<string>) {
  const { text } = useThemeColor();

  return <DefaultText style={[{ color: text }, style]} {...rest} />;
}
