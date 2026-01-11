import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@shared/components/ui/ThemedText';
import { Example } from '@shared/store/useCardsStore';

interface ExampleCardProps {
  example: Example;
  index: number;
  textFontSize: number | undefined;
  sideType: 'front' | 'back';
}

export default function ExampleCard({
  example,
  index,
  textFontSize,
  sideType,
}: ExampleCardProps) {
  const fontSize = Number(textFontSize) * 0.85 || 14; // Default font size if not provided

  return (
    <View style={styles.exampleItem}>
      <Text style={[styles.exampleIndex, { fontSize }]}>{index + 1}.</Text>
      <Text style={[styles.exampleText, { fontSize }]}>
        {example[sideType]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  exampleIndex: {
    // fontWeight: 'bold',
    fontWeight: '500',
    marginRight: 8,
    textAlign: 'right',
    width: 24,
  },
  exampleItem: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  exampleText: {
    flex: 1,
    flexWrap: 'wrap',
  },
});
