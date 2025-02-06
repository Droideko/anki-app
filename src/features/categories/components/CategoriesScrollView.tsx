import React from 'react';
import { StyleSheet } from 'react-native';

import { useCategoryRepository } from '../hooks/useCategoryRepository';

import useRefresh from '@shared/hooks/useRefresh';
import ScrollViewWithRefresh from '@shared/components/ScrollViewWithRefresh';
import KeyboardAvoidingContainer from '@shared/components/KeyboardAvoidingContainer';

interface CategoriesScrollViewProps {
  children: React.ReactNode;
}

export default function CategoriesScrollView({
  children,
}: CategoriesScrollViewProps) {
  const { getCategories } = useCategoryRepository();

  const [refreshing, onRefresh] = useRefresh(getCategories);

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
