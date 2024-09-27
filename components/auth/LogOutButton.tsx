import React from "react";
import ThemedButton from "../ThemedButton";
import { useSession } from "@/src/contexts/SessionProvider";
import { router } from "expo-router";

function LogOutButton() {
  const { signOut } = useSession();

  const onPress = async () => {
    await signOut();
    router.replace("/welcome");
  };

  return <ThemedButton onPress={onPress}>Sign Out</ThemedButton>;
}

export default LogOutButton;
