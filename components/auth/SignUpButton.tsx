import React from "react";
import { useRouter } from "expo-router";
import ThemedButton from "../ThemedButton";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function SignUpButton() {
  const { push } = useRouter();
  const { primary } = useThemeColor();

  return (
    <ThemedButton
      buttonColor={primary}
      icon="email"
      onPress={() => push("/sign-up")}
    >
      Continue with Email
    </ThemedButton>
  );
}
