import React from 'react';
import { StyleSheet } from 'react-native';

import { ThemedView } from '@shared/components/ui/ThemedView';
import CategoriesWaveButton from '@features/categories/components/CategoriesWaveButton';
import KeyboardAvoidingContainer from '@shared/components/KeyboardAvoidingContainer';
import CategoryDataContentInner from '@features/categories/components/CategoryDataContentInner';

export default function CategoriesPage() {
  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingContainer>
        <CategoryDataContentInner />
      </KeyboardAvoidingContainer>
      <CategoriesWaveButton href="/(tabs)/categories/create-category" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
