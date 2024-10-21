import React from "react";
import { Text } from "../../../shared/components/ui/ThemedText";
import { Link } from "expo-router";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";
import { StyleSheet } from "react-native";

function ForgotPasswordLink() {
  const { primary } = useThemeColor();

  return (
    <Text style={styles.text} variant="bodyMedium">
      <Link
        style={{ fontWeight: "bold", color: primary }}
        href={"/password-reset"}
      >
        Forgot password?
      </Link>
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "right",
    marginBottom: 16,
  },
});

export default ForgotPasswordLink;
