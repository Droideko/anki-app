import React from 'react';
import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// import { useCategoryRepository } from '../hooks/useCategoryRepository';

import useRefresh from '@shared/hooks/useRefresh';
import ScrollViewWithRefresh from '@shared/components/ScrollViewWithRefresh';
import KeyboardAvoidingContainer from '@shared/components/KeyboardAvoidingContainer';

interface CategoryScrollViewProps {
  children: React.ReactNode;
}

export default function CardsScrollView({ children }: CategoryScrollViewProps) {
  // const { getCategory } = useCategoryRepository();
  const { deckId } = useLocalSearchParams<{ deckId: string }>();

  // const [refreshing, onRefresh] = useRefresh(() => getCategory(Number(id)));

  // console.log('deckId : ', deckId);

  const [refreshing, onRefresh] = useRefresh(
    () =>
      new Promise((resolve, reject) => {
        return resolve(true);
      }),
  );

  return (
    <KeyboardAvoidingContainer>
      {/* <ScrollViewWithRefresh
        refreshing={refreshing}
        onRefresh={onRefresh}
        style={styles.container}
      > */}
      {children}
      {/* </ScrollViewWithRefresh> */}
    </KeyboardAvoidingContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
});
