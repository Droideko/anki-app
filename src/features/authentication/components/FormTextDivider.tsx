import { StyleSheet } from "react-native";
import { ThemedView } from "../../../shared/components/ui/ThemedView";
import { Divider } from "react-native-paper";
import { Text } from "../../../shared/components/ui/ThemedText";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";

function FormTextDivider() {
  const { background: backgroundColor } = useThemeColor();

  return (
    <ThemedView style={styles.titleContainer}>
      <Divider style={styles.divider} />
      <Text style={[{ backgroundColor, ...styles.text }]} variant="bodyMedium">
        OR
      </Text>
    </ThemedView>
  );
}

export default FormTextDivider;

const styles = StyleSheet.create({
  titleContainer: {
    marginBottom: 16,
  },
  text: {
    textAlign: "center",
    display: "flex",
    alignSelf: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
  divider: {
    position: "absolute",
    top: "50%",
    width: "100%",
  },
});
