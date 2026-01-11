import React from 'react';
// import LottieView from 'lottie-react-native';
import { StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

// import animData from '../../../../assets/images/Animation2.lottie';

import isWeb from '@shared/utils/isWeb';
import { Text } from '@shared/components/ui/ThemedText';
import ThemedButton from '@shared/components/ui/ThemedButton';

export default function CategoryEmpty() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{ textAlign: 'center', fontWeight: 700, marginBottom: 40 }}
          variant="headlineSmall"
        >
          Your Category is Empty
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
          onPress={() => {
            router.push(`/(tabs)/categories/${id}/create-deck-or-subcategory`);
          }}
          mode="contained"
        >
          <Text>Create</Text>
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
