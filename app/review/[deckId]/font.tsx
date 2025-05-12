import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { router, Stack, useLocalSearchParams } from 'expo-router';

import { ThemedView } from '@shared/components/ui/ThemedView';
import { Text } from '@shared/components/ui/ThemedText';
import { useThemeColor } from '@shared/hooks/useThemeColor';
import ReviewBackButton from '@features/review/components/ReviewBackButton';
import ThemedIconButton from '@shared/components/ui/ThemedIconButton';
import { useAsyncFn } from '@shared/hooks/useAsyncFn';
import { useCategoryRepository } from '@features/categories/hooks/useCategoryRepository';
import { useCategoriesStore } from '@shared/store/useCategoriesStore';

export default function Font() {
  const { decksById } = useCategoriesStore();
  const { deckId } = useLocalSearchParams<{ deckId: string }>();

  const [fontSize, setFontSize] = useState(() => {
    return decksById[Number(deckId)]?.fontSize ?? 16;
  });

  const { primary } = useThemeColor();
  const { updateDeck } = useCategoryRepository();

  const [_, onSubmit] = useAsyncFn(async () => {
    await updateDeck(Number(deckId), { fontSize });
    router.back();
  }, [deckId, fontSize]);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Select Font',
          headerRight: () => (
            <ThemedIconButton
              icon="check"
              onPress={() => {
                onSubmit();
              }}
            />
          ),
          headerLeft: (props) => <ReviewBackButton {...props} />,
        }}
      />

      <ThemedView style={styles.container}>
        <View style={styles.cardContainer}>
          <Text style={[styles.text, { fontSize }]}>Front Side</Text>
          <Divider style={styles.divider} />
          <Text style={[styles.text, { fontSize }]}>Back Side</Text>
        </View>

        <View style={styles.sliderContainer}>
          <Text style={styles.fontSizeLabel}>Font Size: {fontSize}px</Text>
          <Slider
            style={styles.slider}
            minimumValue={8}
            maximumValue={40}
            step={1}
            value={fontSize}
            onValueChange={(value) => setFontSize(value)}
            minimumTrackTintColor={primary}
            maximumTrackTintColor="#ccc"
            thumbTintColor={primary}
          />
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 12,
  },
  divider: {
    marginVertical: 6,
    width: '70%',
  },
  fontSizeLabel: {
    marginBottom: 8,
    textAlign: 'center',
  },
  slider: {
    width: '100%',
  },
  sliderContainer: {
    paddingBottom: 20,
  },
  text: {
    marginVertical: 12,
    textAlign: 'center',
  },
});
