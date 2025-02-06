import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import { useCategoryRepository } from '../hooks/useCategoryRepository';

import ThemedButton from '@shared/components/ui/ThemedButton';
import { Text } from '@shared/components/ui/ThemedText';
import useSnackbarStore from '@shared/store/useSnackbarStore';
import { SNACKBAR_TYPE } from '@shared/constants/snackbar';

export default function CategoryMoveButton() {
  const { updateCategory } = useCategoryRepository();
  const { id, subCategoryId } = useLocalSearchParams<{
    id: string;
    subCategoryId: string;
  }>();
  const { showSnackbar } = useSnackbarStore();

  const onPress = async () => {
    const category = await updateCategory(Number(id), {
      parentId: Number(subCategoryId),
    });

    showSnackbar(
      `Category '${category.name}' has been successful moved`,
      SNACKBAR_TYPE.SUCCESS,
    );

    router.replace('/categories');
  };

  return (
    <ThemedButton onPress={onPress}>
      <Text>Move</Text>
    </ThemedButton>
  );
}
