import { useEffect } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ThemedView } from "@/src/shared/components/ui/ThemedView";
import { StyleSheet } from "react-native";
import KeyboardAvoidingContainer from "@/src/shared/components/KeyboardAvoidingContainer";
import {
  CREATE_CATEGORY_ICON_SIZE,
  KEYBOARD_OFFSET_IOS,
} from "@/src/features/categories/constants";
import { Text } from "@/src/shared/components/ui/ThemedText";
import { useCategoryRepository } from "@/src/features/categories/hooks/useCategoryRepository";
import useSnackbarStore from "@/src/shared/store/useSnackbarStore";
import { useAsyncFn } from "@/src/shared/hooks/useAsyncFn";
import { useForm } from "react-hook-form";
import { SNACKBAR_TYPE } from "@/src/shared/constants/snackbar";
import FormInput from "@/src/shared/components/forms/FormInput";
import ThemedButton from "@/src/shared/components/ui/ThemedButton";
import ThemedIconButton from "@/src/shared/components/ui/ThemedIconButton";
import LoadingIndicator from "@/src/shared/components/ui/LoadingIndicator";

const CategoryEdit = () => {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const router = useRouter();

  const { updateCategory } = useCategoryRepository();

  const { control, handleSubmit } = useForm<{ name: string }>({
    defaultValues: {
      name: name || "",
    },
  });

  const { showSnackbar } = useSnackbarStore();

  const [state, onSubmit] = useAsyncFn(async (data: { name: string }) => {
    if (!id) {
      throw new Error("id is undefined");
    }
    const category = await updateCategory(Number(id), data);
    showSnackbar(
      `Category '${category.name}' has been successful edited`,
      SNACKBAR_TYPE.SUCCESS
    );
    router.back();
  }, []);

  useEffect(() => {
    if (!id || !name) {
      showSnackbar(
        "Ошибка: отсутствуют необходимые данные для редактирования.",
        SNACKBAR_TYPE.ERROR
      );
      router.back();
    }
  }, [id, name]);

  if (!id || !name) {
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: `Edit ${name}`,
          presentation: "modal",
        }}
      />
      <KeyboardAvoidingContainer offsetIOS={KEYBOARD_OFFSET_IOS}>
        <ThemedView style={styles.container}>
          <FormInput
            control={control}
            label="Category name"
            name="name"
            placeholder="required"
            rules={{ required: "Name is required" }}
            autoFocus={true}
          />
          <ThemedButton mode="contained" onPress={handleSubmit(onSubmit)}>
            Done
          </ThemedButton>
          <ThemedIconButton
            style={styles.iconCreate}
            onPress={handleSubmit(onSubmit)}
            size={CREATE_CATEGORY_ICON_SIZE}
            icon="check-circle"
          />
          {state.loading && <LoadingIndicator />}
          {state.error && <Text>{state.error.message}</Text>}
        </ThemedView>
      </KeyboardAvoidingContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  iconCreate: {
    position: "absolute",
    width: CREATE_CATEGORY_ICON_SIZE,
    height: CREATE_CATEGORY_ICON_SIZE,
    margin: 0,
    right: 10,
    bottom: 20,
  },
});

export default CategoryEdit;
