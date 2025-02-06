import React from 'react';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import ScrollView from '@shared/components/ScrollView';
import { ThemedView } from '@shared/components/ui/ThemedView';
import { WaveIconWrapper } from '@shared/components/WaveIconWrapper';
import CreateIconButton from '@shared/components/CreateIconButton';

function HomeContainer() {
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
