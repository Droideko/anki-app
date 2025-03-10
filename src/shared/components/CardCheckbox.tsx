import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Checkbox, Divider } from 'react-native-paper';
import { Control, Controller } from 'react-hook-form';

import { Text } from './ui/ThemedText';

import { useThemeColor } from '@shared/hooks/useThemeColor';
import { Card } from '@shared/api/openaiService';

interface CardCheckboxProps<T> {
  name: T;
  onPress: () => void;
  selectedName?: T | null;
}

export default function CardCheckbox({
  card,
  control,
  index,
}: {
  card: Card;
  control: Control<{ checkboxes: boolean[]; deckId: number }>;
  index: number;
}) {
  const { border } = useThemeColor();

  return (
    <Controller
      control={control}
      name={`checkboxes.${index}`}
      defaultValue={true}
      render={({ field: { onChange, value } }) => (
        <Pressable onPress={() => onChange(!value)}>
          <View style={[styles.card, { borderColor: border }]}>
            <View style={styles.iconContainer}>
              <Text style={{ textAlign: 'center' }}>{card.front}</Text>
              <Divider />
              <Text style={{ textAlign: 'center' }}>{card.back}</Text>
            </View>
            <Checkbox status={value ? 'checked' : 'unchecked'} />
          </View>
        </Pressable>
      )}
    />
    // <Pressable onPress={onPress}>
    //   <View style={[styles.card, { borderColor: border }]}>
    //     <View style={styles.iconContainer}>
    //       <Text variant="bodyLarge">{name}</Text>
    //     </View>
    //     <Checkbox
    //       onPress={onPress}
    //       status={name === selectedName ? 'checked' : 'unchecked'}
    //     />
    //   </View>
    // </Pressable>
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
    flex: 1,
    gap: 8,
    // alignItems: 'center',
    // flexDirection: 'row',
    // gap: 12,
    // justifyContent: 'center',
  },
});
