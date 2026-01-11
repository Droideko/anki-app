import React from 'react';
import { router } from 'expo-router';

import ThemedButton from '@shared/components/ui/ThemedButton';
import { useThemeColor } from '@shared/hooks/useThemeColor';
import { Text } from '@shared/components/ui/ThemedText';
// import { useSession } from "@/src/contexts/SessionProvider";

function DeleteAccountButton() {
  // const { signOut } = useSession();
  const { error, background } = useThemeColor();

  const onPress = async () => {
    // await signOut();
    // delete account
    router.replace('/welcome');
  };

  return (
    <ThemedButton buttonColor={background} textColor={error} onPress={onPress}>
      <Text>Delete Account</Text>
    </ThemedButton>
  );
}

export default DeleteAccountButton;
