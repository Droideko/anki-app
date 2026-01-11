import React from 'react';
import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Text } from '@shared/components/ui/ThemedText';
import { ThemedView } from '@shared/components/ui/ThemedView';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <Text variant="labelMedium">This screen doesn&apos;t exist.</Text>
        <Link href="/" style={styles.link}>
          <Text variant="labelMedium">Go to home screen!</Text>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
