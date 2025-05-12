import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Icon, Switch } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';

import { Text } from '@shared/components/ui/ThemedText';
import { useAsyncFn } from '@shared/hooks/useAsyncFn';
import { useCategoriesStore } from '@shared/store/useCategoriesStore';
import { useCategoryRepository } from '@features/categories/hooks/useCategoryRepository';
import { useUserRepository } from '@shared/hooks/repository/userRepository';
import { useUserStore } from '@shared/store/useUserStore';
import { useOptimistic } from '@shared/hooks/useOptimistic';

interface OnlyBackSwitchProps {
  leftText: string;
  style?: StyleProp<ViewStyle>;
}

export default function VibrateSwitch({
  style,
  leftText,
}: OnlyBackSwitchProps) {
  const { user } = useUserStore();
  const { updateUser } = useUserRepository();

  const [switchValue, updateSwitchValue] = useOptimistic(
    user?.isHaptic,
    async (isHaptic) => {
      await updateUser({ isHaptic });
    },
  );

  const handleToggle = async () => await updateSwitchValue(!user?.isHaptic);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.textContainer}>
        <Icon source="vibrate" size={16} />
        <Text variant="bodyLarge">{leftText}</Text>
      </View>
      <Switch value={switchValue} onValueChange={handleToggle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
});
