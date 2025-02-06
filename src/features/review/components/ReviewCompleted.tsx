import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { useProgressRepository } from '../hooks/useProgressRepository';

import { Text } from '@shared/components/ui/ThemedText';
import ThemedButton from '@shared/components/ui/ThemedButton';

export default function ReviewCompletedPage() {
  const { syncProgress } = useProgressRepository();

  useEffect(() => {
    syncProgress();
  }, [syncProgress]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text variant="titleLarge" style={styles.title}>
          🎉 Well Done! 🎉
        </Text>
        <Text variant="titleMedium" style={styles.text}>
          All cards for today are complete!
        </Text>

        <Text variant="titleMedium" style={styles.text}>
          Take a break or try another deck.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <ThemedButton
          style={styles.button}
          onPress={() => {
            router.back();
          }}
        >
          <Text>Go Back</Text>
        </ThemedButton>
        <ThemedButton
          style={styles.button}
          onPress={() => {
            syncProgress();
            /* Navigate to continue learning */
          }}
        >
          <Text>Continue</Text>
        </ThemedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    marginBottom: 16,
    width: '100%',
  },

  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  contentContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  text: {
    textAlign: 'center',
  },

  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
});
