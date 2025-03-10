import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

import ThemedButton from '@shared/components/ui/ThemedButton';
import { Text } from '@shared/components/ui/ThemedText';
import { useThemeColor } from '@shared/hooks/useThemeColor';

interface GeneratedButtonsProps {
  onGenerate: () => void;
}

function GeneratedButtons({ onGenerate }: GeneratedButtonsProps) {
  const { primary } = useThemeColor();

  return (
    <View style={styles.buttonContainer}>
      <ThemedButton
        contentStyle={{ margin: 0 }}
        style={[styles.button, { borderColor: primary }]}
      >
        <Text style={{ color: primary }}>Examples</Text>
      </ThemedButton>
      <ThemedButton
        contentStyle={{ margin: 0 }}
        style={[styles.button, { borderColor: primary }]}
        onPress={onGenerate}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: primary }}>Regenerate</Text>
          <FontAwesome6
            style={{ marginLeft: 4 }}
            name="arrow-rotate-left"
            size={16}
            color={primary}
          />
        </View>
      </ThemedButton>
    </View>
  );
}

export default GeneratedButtons;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flex: 1,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    marginTop: 16,
    paddingHorizontal: 12,
  },
});
