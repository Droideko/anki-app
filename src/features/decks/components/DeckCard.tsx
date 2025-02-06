import React from 'react';
import { Card } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Control } from 'react-hook-form';

import { CardFormValues } from './DeckCardsContainer';

import { useThemeColor } from '@shared/hooks/useThemeColor';
import FormTextarea from '@shared/components/forms/FormTextarea';

interface DeckCardProps {
  control: Control<CardFormValues>;
  index: number;
  autoFocus?: boolean;
  onEdit?: () => void;
}

export default function DeckCard({
  control,
  index,
  autoFocus,
  onEdit,
}: DeckCardProps) {
  const { border, elevation } = useThemeColor();

  return (
    <Card
      mode="elevated"
      style={[
        styles.card,
        { borderBlockEndColor: border, backgroundColor: elevation.level1 },
      ]}
    >
      <Card.Content style={styles.content}>
        <FormTextarea
          style={styles.textArea}
          control={control}
          label="Front"
          name={`cards.${index}.front`}
          autoFocus={autoFocus}
          onChangeText={() => {
            onEdit?.();
          }}
        />
        <FormTextarea
          control={control}
          label="Back"
          name={`cards.${index}.back`}
          onChangeText={() => {
            onEdit?.();
          }}
        />
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    marginBottom: 8,
  },
  content: {
    paddingTop: 8,
  },
  textArea: {
    marginBottom: 8,
  },
});
