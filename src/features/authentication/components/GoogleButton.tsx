import React from "react";
import ThemedButton from "@/src/shared/components/ui/ThemedButton";
import GoogleIcon from "../icons/GoogleIcon";

function GoogleButton() {
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
