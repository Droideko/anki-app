import React from 'react';
import { Control } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

import { CardFormValue } from '../types';

import FormTextarea from '@shared/components/forms/FormTextarea';
import { useThemeColor } from '@shared/hooks/useThemeColor';

interface ReviewEditContainterProps {
  control: Control<CardFormValue>;
  autoFocus?: boolean;
}

export default function ReviewEditCard({
  control,
  autoFocus = false,
}: ReviewEditContainterProps) {
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
          name="card.front"
          style={styles.textArea}
          control={control}
          label="Front"
          autoFocus={autoFocus}
        />
        <FormTextarea name="card.back" control={control} label="Back" />
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
