import React from 'react';
// import LottieView from 'lottie-react-native';
import { StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// import animData from '../../../../assets/images/Animation2.lottie';

import isWeb from '@shared/utils/isWeb';
import { Text } from '@shared/components/ui/ThemedText';
import ThemedButton from '@shared/components/ui/ThemedButton';
import { useThemeColor } from '@shared/hooks/useThemeColor';

export default function DeckEmpty() {
  const { deckId } = useLocalSearchParams<{ deckId: string }>();
  const { onPrimary } = useThemeColor();

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{ textAlign: 'center', fontWeight: 700, marginBottom: 40 }}
          variant="headlineSmall"
        >
          This Deck is empty
        </Text>
        {!isWeb() && (
          <View style={{ display: 'flex', alignItems: 'center' }}>
            {/* <LottieView
              source={animData}
              loop
              autoPlay
              // animatedProps={animatedProps}
              style={styles.animation}
            /> */}
          </View>
        )}

        <ThemedButton
          contentStyle={{ padding: 0 }}
          onPress={() => {
            router.push(`/deck/${deckId}/card/create?action=add`);
          }}
          mode="contained"
        >
          <Text variant="bodyLarge">Create</Text>
        </ThemedButton>
        <ThemedButton
          contentStyle={{ padding: 0 }}
          onPress={() => {
            router.push(`/deck/${deckId}/card/generate`);
          }}
          mode="contained"
        >
          <Text variant="bodyLarge">
            Generate{' '}
            <MaterialCommunityIcons
              name="star-four-points"
              size={16}
              color={onPrimary}
            />
          </Text>
        </ThemedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  animation: { height: 200, width: 200 },
  container: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
});
