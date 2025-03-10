// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { StyleSheet, View } from 'react-native';

// import { useCategoryRepository } from '@features/categories/hooks/useCategoryRepository';
// import {
//   CREATE_CATEGORY_ICON_SIZE,
//   DEFAULT_CREATE_CATEGORY_VALUES,
// } from '@features/categories/constants';
// import useSnackbarStore from '@shared/store/useSnackbarStore';
// import { useAsyncFn } from '@shared/hooks/useAsyncFn';
// import { SNACKBAR_TYPE } from '@shared/constants/snackbar';
// import FormInput from '@shared/components/forms/FormInput';
// import ThemedButton from '@shared/components/ui/ThemedButton';
// import ThemedIconButton from '@shared/components/ui/ThemedIconButton';
// import LoadingIndicator from '@shared/components/ui/LoadingIndicator';
// import { Text } from '@shared/components/ui/ThemedText';
// import { CreateCategoryData } from '@features/categories/types';

// export default function SubcategoryContentCreation() {
//   const { createCategory } = useCategoryRepository();
//   const { id: parentId } = useLocalSearchParams();
//   const router = useRouter();

//   const { control, handleSubmit } = useForm<CreateCategoryData>({
//     defaultValues: DEFAULT_CREATE_CATEGORY_VALUES,
//   });
//   const { showSnackbar } = useSnackbarStore();

//   const [state, onSubmit] = useAsyncFn(async (data: CreateCategoryData) => {
//     const { name, id } = await createCategory({
//       ...data,
//       parentId: Number(parentId),
//     });
//     showSnackbar(
//       `Subcategory '${name}' has been successful created`,
//       SNACKBAR_TYPE.SUCCESS,
//     );

//     router.replace({
//       pathname: `/categories/[id]`,
//       params: { id: String(id), name },
//     });
//   }, []);

//   return (
//     <View style={styles.container}>
//       <FormInput
//         control={control}
//         label="Category name"
//         name="name"
//         placeholder="required"
//         rules={{ required: 'Category name is required' }}
//         autoFocus={true}
//       />
//       <ThemedButton mode="contained" onPress={handleSubmit(onSubmit)}>
//         <Text>Create</Text>
//       </ThemedButton>
//       <ThemedIconButton
//         style={styles.iconCreate}
//         onPress={() => {
//           handleSubmit(onSubmit);
//         }}
//         size={CREATE_CATEGORY_ICON_SIZE}
//         icon="check-circle"
//       />
//       {state.loading && <LoadingIndicator />}
//       {state.error && <Text>{state.error.message}</Text>}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   iconCreate: {
//     bottom: 0,
//     height: CREATE_CATEGORY_ICON_SIZE,
//     margin: 0,
//     position: 'absolute',
//     right: 0,
//     width: CREATE_CATEGORY_ICON_SIZE,
//   },
// });
