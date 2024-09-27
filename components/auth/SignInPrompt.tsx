import React from "react";
import { Text } from "../ThemedText";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

function SignInPrompt() {
  const { primary } = useThemeColor();

  return (
    <Text style={styles.text} variant="bodyLarge">
      Do you have already Account?{" "}
      <Link style={{ fontWeight: "bold", color: primary }} href={"/login"}>
        Log In
      </Link>
    </Text>
  );
}

export default SignInPrompt;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginBottom: 16,
  },
});
