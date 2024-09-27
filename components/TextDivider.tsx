import { StyleSheet } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import { Divider } from "react-native-paper";
import { Text } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

interface OwnProps {}

function TextDivider() {
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

export default TextDivider;

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
