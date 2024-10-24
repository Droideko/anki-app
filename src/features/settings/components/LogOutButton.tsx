import React from 'react';
import { router } from 'expo-router';

import ThemedButton from '@shared/components/ui/ThemedButton';
import { Text } from '@shared/components/ui/ThemedText';
import { useSession } from '@shared/contexts/SessionProvider';
import { handleRepositoryError } from '@shared/utils/errorHandler';

function LogOutButton() {
  const { signOut } = useSession();

  const onPress = async () => {
    try {
      await signOut();
      router.replace('/welcome');
    } catch (error: unknown) {
      handleRepositoryError(error);
    }
  };

  return (
    <ThemedButton onPress={onPress}>
      <Text>Sign Out</Text>
    </ThemedButton>
  );
}

export default LogOutButton;
