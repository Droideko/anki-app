import React from "react";
import { useRouter } from "expo-router";
import ThemedButton from "../../../shared/components/ui/ThemedButton";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";

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
