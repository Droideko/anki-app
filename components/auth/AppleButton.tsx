import React from "react";
import ThemedButton from "@/components/ThemedButton";
import { Icon, useTheme } from "react-native-paper";

function AppleButton() {
  const { colors } = useTheme();

  const onAuth = () => {
    console.log("apple auth");
  };

  return (
    <ThemedButton
      icon={() => <Icon source="apple" size={20} />}
      onPress={onAuth}
    >
      Continue with Google
    </ThemedButton>
  );
}

export default AppleButton;
