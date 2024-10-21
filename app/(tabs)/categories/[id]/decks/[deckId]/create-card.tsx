import { StyleSheet } from "react-native";
import KeyboardAvoidingContainer from "@/src/shared/components/KeyboardAvoidingContainer";
import useSegmentedButtons from "@/src/features/categories/hooks/useSegmentedButtons";
import { ThemedView } from "@/src/shared/components/ui/ThemedView";
import { KEYBOARD_OFFSET_IOS } from "@/src/features/categories/constants";
import { Text } from "@/src/shared/components/ui/ThemedText";

export default function CreateDeckOrSubcategory() {
  const [value, onChange] = useSegmentedButtons();

  return (
    <KeyboardAvoidingContainer offsetIOS={KEYBOARD_OFFSET_IOS}>
      <ThemedView style={styles.container}>
        <Text>Test</Text>
      </ThemedView>
    </KeyboardAvoidingContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  iconCreate: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});
