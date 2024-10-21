import ThemedIconButton from "@/src/shared/components/ui/ThemedIconButton";
import { Text } from "@/src/shared/components/ui/ThemedText";
import { ThemedView } from "@/src/shared/components/ui/ThemedView";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";
// import { StatusBar } from "expo-status-bar";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function CreateDeck() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const { error } = useThemeColor();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
      style={styles.containerView}
    >
      <ThemedView style={styles.container}>
        <Text style={styles.title} variant="headlineMedium">
          New Deck
        </Text>
        <Controller
          control={control}
          name="name"
          rules={{ required: "First name is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="Name"
                style={styles.textInput}
                autoFocus={true}
                placeholder="required"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.name}
              />
              {errors.name && (
                <Text style={{ color: error }}>{errors.name.message}</Text>
              )}
            </>
          )}
        />

        <Button
          style={styles.button}
          mode="contained"
          onPress={handleSubmit(onSubmit)}
        >
          Create
        </Button>

        <ThemedIconButton
          style={styles.iconCreate}
          onPress={handleSubmit(onSubmit)}
          size={50}
          icon="check-circle"
        />

        {/* Use a light status bar on iOS to account for the black space above the modal */}
        {/* <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} /> */}
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 12,
  },
  separator: {
    marginVertical: 30,
    height: 5,
    width: "80%",
  },
  textInput: {
    marginBottom: 8,
  },
  button: {
    marginTop: 8,
    marginBottom: 8,
  },
  iconCreate: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});
