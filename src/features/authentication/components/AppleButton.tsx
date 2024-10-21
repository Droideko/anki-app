import React from "react";
import ThemedButton from "@/src/shared/components/ui/ThemedButton";
import { Icon } from "react-native-paper";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";

function AppleButton() {
  const { background } = useThemeColor();

  const onAuth = () => {
    console.log("apple auth");
  };

  return (
    <ThemedButton
      buttonColor={background}
      icon={() => <Icon source="apple" size={20} />}
      onPress={onAuth}
    >
      Continue with Apple
    </ThemedButton>
  );
}

export default AppleButton;
