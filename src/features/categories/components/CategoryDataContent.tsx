// import React, { useState } from 'react';

// import useFilteredCategoriesAndDecks from '../hooks/useFilteredCategoriesAndDecks';

// import { Text } from '@shared/components/ui/ThemedText';
// import { useFetchCategories } from '@features/categories/hooks/useFetchCategories';
// import CategoryDataContentInner from '@features/categories/components/CategoryDataContentInner';
// import Search from '@shared/components/Search';

// export default function CategoryDataContent() {
//   const [search, setSearch] = useState('');

//   const { loading, error, categories } = useFetchCategories();

//   const { filteredCategories } = useFilteredCategoriesAndDecks(
//     search,
//     categories,
//   );

//   if (loading) {
//     return <Text>Loading</Text>;
//   }

//   if (error) {
//     return <Text>{error.message}</Text>;
//   }

//   if (categories.length === 0) {
//     return <Text>No categories available</Text>;
//   }

//   return (
//     <>
//       <Search onChange={setSearch} debounceTime={300} />
//       <CategoryDataContentInner />
//     </>
//   );
// }
