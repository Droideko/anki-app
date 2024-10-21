import { StyleSheet } from "react-native";
import { ThemedView } from "@/src/shared/components/ui/ThemedView";
import LanguageSetting from "@/src/features/settings/components/LanguageSetting";
import LogOutButton from "@/src/features/settings/components/LogOutButton";
import DeleteAccountButton from "@/src/features/settings/components/DeleteAccountButton";

export default function SettingsScreen() {
  return (
    <ThemedView style={styles.container}>
      <LanguageSetting />
      <LogOutButton />
      <DeleteAccountButton />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
});
