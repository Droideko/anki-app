import React from "react";
import { StyleSheet } from "react-native";
import ThemedButton from "@/components/ThemedButton";
import GoogleIcon from "./GoogleIcon";
import { useTheme } from "react-native-paper";

function GoogleButton() {
  const { colors } = useTheme();

  const onAuth = () => {
    console.log("google auth");
  };

  return (
    <ThemedButton
      buttonColor="#fff"
      textColor="rgb(16, 26, 43)"
      icon={() => <GoogleIcon width={20} height={20} />}
      onPress={onAuth}
    >
      Continue with Google
    </ThemedButton>
  );
}

export default GoogleButton;
