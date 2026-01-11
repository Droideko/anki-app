import React from 'react';
import { StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

import ThemedButton from '@shared/components/ui/ThemedButton';
import { Text } from '@shared/components/ui/ThemedText';
import { useThemeColor } from '@shared/hooks/useThemeColor';

function GenerateButton({ deckId }: { deckId: string }) {
  const { primary } = useThemeColor();

  const onPress = () => {
    router.push({
      // pathname: `/categories/[id]/decks/[deckId]/generate`,
      pathname: `/deck/[deckId]/card/generate`,
      params: { deckId },
    });
  };

  return (
    <ThemedButton
      contentStyle={{ margin: 0 }}
      labelStyle={styles.labelStyle}
      style={{ marginBottom: 0, borderColor: primary }}
      onPress={onPress}
    >
      <Text style={{ color: primary }}>
        Generate{' '}
        <MaterialCommunityIcons
          name="star-four-points"
          size={16}
          color={primary}
        />
      </Text>
    </ThemedButton>
  );
}

const styles = StyleSheet.create({
  labelStyle: {
    marginHorizontal: 16,
    marginVertical: 6,
  },
});

export default GenerateButton;
