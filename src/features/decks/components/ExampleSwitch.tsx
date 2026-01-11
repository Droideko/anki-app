import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Switch } from 'react-native-paper';

import { Text } from '@shared/components/ui/ThemedText';

interface ExampleSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  leftText: string;
  style?: StyleProp<ViewStyle>;
}

export default function ExampleSwitch({
  style,
  leftText,
  value,
  onValueChange,
}: ExampleSwitchProps) {
  return (
    <View style={[styles.container, style]}>
      <Text variant="bodyLarge">{leftText}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
