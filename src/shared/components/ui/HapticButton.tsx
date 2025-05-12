import React from 'react';
import { ButtonProps } from 'react-native-paper';
import * as Haptics from 'expo-haptics';
import { GestureResponderEvent } from 'react-native';

import ThemedButton from './ThemedButton';

import { useUserStore } from '@shared/store/useUserStore';

export default function HapticButton({ onPress, ...props }: ButtonProps) {
  const { user } = useUserStore();

  const hapticPress = async (e: GestureResponderEvent) => {
    if (user?.isHaptic) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    onPress?.(e);
  };

  return <ThemedButton onPress={hapticPress} {...props} />;
}
