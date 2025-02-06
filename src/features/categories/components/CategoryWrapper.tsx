import React from 'react';

import SubcategoryDataContent from './SubcategoryDataContent';

import Search from '@shared/components/Search';
import useSearchDebounce from '@shared/hooks/useSearchDebounce';

function CategoryWrapper() {
  const [searchQuery, debouncedSearch] = useSearchDebounce();

  return (
    <>
      <Search onChangeCallback={debouncedSearch} />
      <SubcategoryDataContent searchQuery={searchQuery} />
    </>
  );
}

export default CategoryWrapper;
