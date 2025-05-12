// GeneratedButtons.tsx

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

import ThemedButton from '@shared/components/ui/ThemedButton';
import { Text } from '@shared/components/ui/ThemedText';
import { useThemeColor } from '@shared/hooks/useThemeColor';

interface GeneratedButtonsProps {
  onGenerate: () => void;
  onToggleExamples: () => void;
  allOpen: boolean;
  hasExamples: boolean;
}

export default function GeneratedButtons({
  onGenerate,
  onToggleExamples,
  allOpen,
  hasExamples,
}: GeneratedButtonsProps) {
  const { primary } = useThemeColor();

  return (
    <View style={styles.buttonContainer}>
      {hasExamples && (
        <ThemedButton
          onPress={onToggleExamples}
          contentStyle={{ margin: 0 }}
          style={[styles.btn, { borderColor: primary, marginRight: 8 }]}
        >
          <Text style={{ color: primary }}>
            {allOpen ? 'Hide examples' : 'Show examples'}
          </Text>
        </ThemedButton>
      )}
      <ThemedButton
        onPress={onGenerate}
        contentStyle={{ margin: 0 }}
        style={[styles.btn, { borderColor: primary }]}
      >
        <View style={styles.iconRow}>
          <Text style={{ color: primary }}>Regenerate</Text>
          <FontAwesome6
            name="arrow-rotate-left"
            size={16}
            color={primary}
            style={{ marginLeft: 4 }}
          />
        </View>
      </ThemedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    flex: 1, // <-- равное "весло" для обеих кнопок
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
    paddingHorizontal: 12,
    // space-between уже не нужен, мы управляем через margin у кнопок
  },
  iconRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
