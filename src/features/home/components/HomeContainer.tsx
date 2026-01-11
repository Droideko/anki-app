import React from 'react';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';

import ScrollView from '@shared/components/ScrollView';
import { ThemedView } from '@shared/components/ui/ThemedView';
import { WaveIconWrapper } from '@shared/components/WaveIconWrapper';
import CreateIconButton from '@shared/components/CreateIconButton';
import { useAsync } from '@shared/hooks/useAsync';
import { useUserRepository } from '@shared/hooks/repository/userRepository';
import { useUserStore } from '@shared/store/useUserStore';

function HomeContainer() {
  const { user } = useUserStore();
  const { finishFirstLogin } = useUserRepository();

  useAsync(async () => {
    if (user?.isFirstLogin) {
      await finishFirstLogin();
      router.push('/(wizard)/steps/step1');
    }
  }, [user?.isFirstLogin]);

  return (
    <ScrollView>
      <ThemedView>
        <WaveIconWrapper
          style={styles.iconWrapper}
          isActivePulse={true}
          iconSize={50}
        >
          <CreateIconButton href="/(auth)/login" size={50} />
        </WaveIconWrapper>
      </ThemedView>
    </ScrollView>
  );
}

export default HomeContainer;

const styles = StyleSheet.create({
  iconWrapper: {
    bottom: 0,
    height: 75,
    right: 0,
    width: 75,
  },
});
