import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';

import ScrollView from '@shared/components/ScrollView';
import CategoryMoveContainer from '@features/categories/components/CategoryMoveContainer';

export default function SubcategoryMovePage() {
  const { name } = useLocalSearchParams<{ name: string }>();

  return (
    <>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: `Move ${name}`,
        }}
      />
      <ScrollView>
        <CategoryMoveContainer />
      </ScrollView>
    </>
  );
}
