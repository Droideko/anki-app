import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';

import ScrollView from '@shared/components/ScrollView';
import CategoryMoveContainer from '@features/categories/components/CategoryMoveContainer';

export default function CategoryMovePage() {
  const { name } = useLocalSearchParams<{ name: string }>();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: `Move ${name}`,
        }}
      />
      <ScrollView>
        <CategoryMoveContainer />
      </ScrollView>
    </>
  );
}
