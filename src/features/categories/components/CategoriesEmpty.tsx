import React, { useEffect, useRef } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import animData from '../../../../assets/images/Animation2.lottie';

import isWeb from '@shared/utils/isWeb';
import { Text } from '@shared/components/ui/ThemedText';
import ThemedButton from '@shared/components/ui/ThemedButton';

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function CategoriesEmpty() {
  // const progress = useSharedValue(0);

  // // Шаг 2: Animated props, связывающие progress.value с пропсом LottieView
  // const animatedProps = useAnimatedProps(() => ({
  //   progress: progress.value,
  // }));

  // useEffect(() => {
  //   progress.value = withRepeat(
  //     withTiming(1, { duration: 3000, easing: Easing.linear }),
  //     -1, // бесконечно повторять анимацию&#8203;:contentReference[oaicite:5]{index=5}
  //     false, // не проигрывать в обратном направлении (каждый цикл с начала)
  //   );
  // }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{ textAlign: 'center', fontWeight: 700, marginBottom: 40 }}
          variant="headlineSmall"
        >
          Your Workspace is Empty
        </Text>
        {!isWeb() && (
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <AnimatedLottieView
              source={animData}
              loop
              autoPlay
              // animatedProps={animatedProps}
              style={styles.animation}
            />
          </View>
        )}

        <ThemedButton
          onPress={() => {
            router.push('/(tabs)/categories/create-category');
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
  animation: {
    height: 200,
    width: 200,
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
});
