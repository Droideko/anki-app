import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';

import { Text } from './ui/ThemedText';

import { useThemeColor } from '@shared/hooks/useThemeColor';

interface CardLanguageProps<T> {
  name: T;
  onPress: () => void;
  selectedName?: T | null;
}

export default function CardLanguage<T extends string>({
  name,
  onPress,
  selectedName,
}: CardLanguageProps<T>) {
  const { border } = useThemeColor();

  return (
    <Pressable onPress={onPress}>
      <View style={[styles.card, { borderColor: border }]}>
        <View style={styles.iconContainer}>
          <Ionicons name="at-circle" size={20} color="#fff" />
          <Text variant="bodyLarge">{name}</Text>
        </View>
        <RadioButton
          onPress={onPress}
          status={name === selectedName ? 'checked' : 'unchecked'}
          value={name}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginBottom: 12,
    padding: 12,
    width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
});
