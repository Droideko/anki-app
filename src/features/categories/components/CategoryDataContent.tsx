import React from 'react';

import useFilteredCategoriesAndDecks from '../hooks/useFilteredCategoriesAndDecks';

// import CategorySkeleton from './CategorySkeleton';

import { Text } from '@shared/components/ui/ThemedText';
import { useFetchCategories } from '@features/categories/hooks/useFetchCategories';
import CategoryDataContentInner from '@features/categories/components/CategoryDataContentInner';
import useSearchDebounce from '@shared/hooks/useSearchDebounce';
import Search from '@shared/components/Search';

export default function CategoryDataContent() {
  const [searchQuery, debouncedSearch] = useSearchDebounce();

  const { loading, error, categories } = useFetchCategories();

  const { filteredCategories } = useFilteredCategoriesAndDecks(
    searchQuery,
    categories,
  );

  if (loading) {
    // TODO Spinner
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  if (categories.length === 0) {
    return <Text>No categories available</Text>;
  }

  return (
    <>
      <Search onChangeCallback={debouncedSearch} />
      <CategoryDataContentInner categories={filteredCategories} />
    </>
  );
}
