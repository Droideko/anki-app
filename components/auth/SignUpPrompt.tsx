import React from "react";
import { Text } from "../ThemedText";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

function SignUpPrompt() {
  const { primary } = useThemeColor();

  return (
    <Text style={styles.text} variant="bodyLarge">
      Don't have an account?{" "}
      <Link style={{ fontWeight: "bold", color: primary }} href={"/sign-up"}>
        Sign up
      </Link>
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginBottom: 16,
  },
});

export default SignUpPrompt;
