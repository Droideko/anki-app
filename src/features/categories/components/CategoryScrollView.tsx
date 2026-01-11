import React from 'react';
import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { useCategoryRepository } from '../hooks/useCategoryRepository';

import useRefresh from '@shared/hooks/useRefresh';
import ScrollViewWithRefresh from '@shared/components/ScrollViewWithRefresh';
import KeyboardAvoidingContainer from '@shared/components/KeyboardAvoidingContainer';

interface CategoryScrollViewProps {
  children: React.ReactNode;
}

export default function CategoryScrollView({
  children,
}: CategoryScrollViewProps) {
  const { getCategory } = useCategoryRepository();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [refreshing, onRefresh] = useRefresh([() => getCategory(Number(id))]);

  return (
    <KeyboardAvoidingContainer>
      <ScrollViewWithRefresh
        refreshing={refreshing}
        onRefresh={onRefresh}
        style={styles.container}
      >
        {children}
      </ScrollViewWithRefresh>
    </KeyboardAvoidingContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
});
