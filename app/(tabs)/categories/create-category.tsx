import React from 'react';

import CrateCategoryOrDeck from '@features/categories/components/CrateCategoryOrDeck';

export default function CreateCategoryPage() {
  return <CrateCategoryOrDeck />;
}

// import React from 'react';
// import { router } from 'expo-router';
// import { StyleSheet } from 'react-native';
// import { useForm } from 'react-hook-form';
// import { SegmentedButtons } from 'react-native-paper';

// import FormInput from '@shared/components/forms/FormInput';
// import KeyboardAvoidingContainer from '@shared/components/KeyboardAvoidingContainer';
// import ThemedIconButton from '@shared/components/ui/ThemedIconButton';
// import { ThemedView } from '@shared/components/ui/ThemedView';
// import ThemedButton from '@shared/components/ui/ThemedButton';
// import { useCategoryRepository } from '@features/categories/hooks/useCategoryRepository';
// import { useAsyncFn } from '@shared/hooks/useAsyncFn';
// import LoadingIndicator from '@shared/components/ui/LoadingIndicator';
// import { Text } from '@shared/components/ui/ThemedText';
// import useSnackbarStore from '@shared/store/useSnackbarStore';
// import { SNACKBAR_TYPE } from '@shared/constants/snackbar';
// import {
//   CATEGORY_SEGMENT_BUTTON,
//   CREATE_CATEGORY_ICON_SIZE,
//   KEYBOARD_OFFSET_IOS,
// } from '@features/categories/constants';
// import useSegmentedButtons from '@features/categories/hooks/useSegmentedButtons';

// export default function CreateCategoryPage() {
//   const { createCategory, createDeck } = useCategoryRepository();
//   const [value, onChange] = useSegmentedButtons();

//   const { control, handleSubmit } = useForm<{ name: string }>({
//     defaultValues: {
//       name: '',
//     },
//   });
//   const { showSnackbar } = useSnackbarStore();

//   const [state, onSubmit] = useAsyncFn(
//     async (data: { name: string }) => {
//       const isDeck = value === 'deck';

//       const createItem = isDeck ? createDeck : createCategory;
//       const result = await createItem(data);

//       showSnackbar(
//         `${isDeck ? 'Deck' : 'Category'} '${result.name}' has been successful created`,
//         SNACKBAR_TYPE.SUCCESS,
//       );

//       if (isDeck) {
//         router.back();
//         router.push({
//           pathname: '/deck/[deckId]',
//           params: {
//             deckId: String(result.id),
//             name: result.name,
//           },
//         });
//         return;
//       }

//       router.replace({
//         pathname: '/(tabs)/categories/[id]',
//         params: {
//           id: String(result.id),
//           name: result.name,
//         },
//       });
//     },
//     [value],
//   );

//   return (
//     <KeyboardAvoidingContainer offsetIOS={KEYBOARD_OFFSET_IOS}>
//       <ThemedView style={styles.container}>
//         <SegmentedButtons
//           style={{ marginBottom: 16 }}
//           value={value}
//           onValueChange={onChange}
//           buttons={Object.values(CATEGORY_SEGMENT_BUTTON)}
//         />
//         <FormInput
//           name="name"
//           control={control}
//           label={value === 'category' ? 'Category name' : 'Deck Name'}
//           placeholder={value === 'category' ? 'Enter category' : 'Enter deck'}
//           rules={{ required: 'This field is required' }}
//           autoFocus={true}
//         />

//         <ThemedButton mode="contained" onPress={handleSubmit(onSubmit)}>
//           <Text>Create</Text>
//         </ThemedButton>
//         <ThemedIconButton
//           style={styles.iconCreate}
//           onPress={() => {
//             handleSubmit(onSubmit)();
//           }}
//           size={CREATE_CATEGORY_ICON_SIZE}
//           icon="check-circle"
//         />
//         {state.loading && <LoadingIndicator />}
//         {state.error && <Text>{state.error.message}</Text>}
//       </ThemedView>
//     </KeyboardAvoidingContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   iconCreate: {
//     bottom: 0,
//     position: 'absolute',
//     right: 0,
//   },
// });
