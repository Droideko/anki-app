import { useCategoryRepository } from "@/src/features/categories/hooks/useCategoryRepository";
import { CreateCategoryData } from "@/src/types/category";
import { useForm } from "react-hook-form";
import {
  CREATE_CATEGORY_ICON_SIZE,
  DEFAULT_CREATE_CATEGORY_VALUES,
} from "@/src/features/categories/constants";
import useSnackbarStore from "@/src/shared/store/useSnackbarStore";
import { useAsyncFn } from "@/src/shared/hooks/useAsyncFn";
import { SNACKBAR_TYPE } from "@/src/shared/constants/snackbar";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import FormInput from "@/src/shared/components/forms/FormInput";
import ThemedButton from "@/src/shared/components/ui/ThemedButton";
import ThemedIconButton from "@/src/shared/components/ui/ThemedIconButton";
import LoadingIndicator from "@/src/shared/components/ui/LoadingIndicator";
import { Text } from "@/src/shared/components/ui/ThemedText";

export default function SubcategoryContentCreation() {
  const { createCategory } = useCategoryRepository();
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { control, handleSubmit } = useForm<CreateCategoryData>({
    defaultValues: DEFAULT_CREATE_CATEGORY_VALUES,
  });
  const { showSnackbar } = useSnackbarStore();

  const [state, onSubmit] = useAsyncFn(async (data: CreateCategoryData) => {
    const category = await createCategory({
      ...data,
      parentId: Number(id), // TODO подумать перенаправление когда parentCategoryId === 'undefined
    });
    showSnackbar(
      `Subcategory '${category.name}' has been successful created`,
      SNACKBAR_TYPE.SUCCESS
    );

    router.replace({
      pathname: `/categories/${category.id}`,
      params: { name: category.name },
    });
  }, []);

  return (
    <View style={styles.container}>
      <FormInput
        control={control}
        label="Category name"
        name="name"
        placeholder="required"
        rules={{ required: "Category name is required" }}
        autoFocus={true}
      />
      <ThemedButton mode="contained" onPress={handleSubmit(onSubmit)}>
        Create
      </ThemedButton>
      <ThemedIconButton
        style={styles.iconCreate}
        onPress={handleSubmit(onSubmit)}
        size={CREATE_CATEGORY_ICON_SIZE}
        icon="check-circle"
      />
      {state.loading && <LoadingIndicator />}
      {state.error && <Text>{state.error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconCreate: {
    position: "absolute",
    width: CREATE_CATEGORY_ICON_SIZE,
    height: CREATE_CATEGORY_ICON_SIZE,
    margin: 0,
    right: 0,
    bottom: 0,
  },
});
