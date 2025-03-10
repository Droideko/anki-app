import React from 'react';

import CrateCategoryOrDeck from '@features/categories/components/CrateCategoryOrDeck';

export default function CreateCategoryOrDeckPage() {
  return <CrateCategoryOrDeck />;
}

// import React from 'react';
// import { StyleSheet } from 'react-native';
// import { SegmentedButtons } from 'react-native-paper';

// import KeyboardAvoidingContainer from '@shared/components/KeyboardAvoidingContainer';
// import useSegmentedButtons from '@features/categories/hooks/useSegmentedButtons';
// import { ThemedView } from '@shared/components/ui/ThemedView';
// import {
//   CATEGORY_SEGMENT_BUTTON,
//   KEYBOARD_OFFSET_IOS,
// } from '@features/categories/constants';
// import SubcategoryContentCreation from '@features/categories/components/SubcategoryContentCreation';
// import DeckContentCreation from '@features/categories/components/DeckContentCreation';

// export default function CreateDeckOrSubcategory() {
//   const [value, onChange] = useSegmentedButtons();

//   return (
//     <KeyboardAvoidingContainer offsetIOS={KEYBOARD_OFFSET_IOS}>
//       <ThemedView style={styles.container}>
//         <SegmentedButtons
//           style={{ marginBottom: 16 }}
//           value={value}
//           onValueChange={onChange}
//           buttons={Object.values(CATEGORY_SEGMENT_BUTTON)}
//         />
//         {value === CATEGORY_SEGMENT_BUTTON.category.value ? (
//           <SubcategoryContentCreation />
//         ) : (
//           <DeckContentCreation />
//         )}
//       </ThemedView>
//     </KeyboardAvoidingContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
// });
