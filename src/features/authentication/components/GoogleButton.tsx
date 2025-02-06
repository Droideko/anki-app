import React from 'react';

import GoogleIcon from '../icons/GoogleIcon';

import ThemedButton from '@shared/components/ui/ThemedButton';
import { Text } from '@shared/components/ui/ThemedText';

function GoogleButton() {
  const onAuth = () => {
    console.log('google auth');
  };

  return (
    <ThemedButton
      buttonColor="#fff"
      icon={() => <GoogleIcon width={20} height={20} />}
      onPress={onAuth}
    >
      <Text style={{ color: 'rgb(16, 26, 43)' }}>Continue with Google</Text>
    </ThemedButton>
  );
}

export default GoogleButton;
