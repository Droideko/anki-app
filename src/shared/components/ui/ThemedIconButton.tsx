import React from 'react';
import { IconButton, IconButtonProps } from 'react-native-paper';

import { useThemeColor } from '@shared/hooks/useThemeColor';

const ThemedIconButton = (props: IconButtonProps) => {
  const { primary } = useThemeColor();

  return <IconButton iconColor={props.iconColor || primary} {...props} />;
};

export default ThemedIconButton;
