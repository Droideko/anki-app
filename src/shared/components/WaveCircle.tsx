import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

import { useThemeColor } from '@shared/hooks/useThemeColor';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function WaveCircle({ iconSize }: { iconSize: number }) {
  const { primary, background } = useThemeColor();
  const radius = useSharedValue(0);
  const opacity = useSharedValue(1);

  const getCoverStyles = (size: number) => ({
    width: size - size / 5,
    height: size - size / 5,
    borderRadius: (size - size / 5) / 2,
  });

  // Настройка анимации радиуса
  const animatedProps = useAnimatedProps(() => {
    return {
      r: radius.value.toString(),
      opacity: opacity.value,
    };
  });

  // Запуск анимации при монтировании компонента
  useEffect(() => {
    radius.value = withRepeat(
      withTiming(60, {
        duration: 2000,
        easing: Easing.out(Easing.ease),
      }),
      -1,
      false,
    );

    opacity.value = withRepeat(
      withTiming(0, {
        duration: 2000,
        easing: Easing.out(Easing.ease),
      }),
      -1,
      false,
    );
  }, []);

  return (
    <>
      <Svg style={StyleSheet.absoluteFill} viewBox="0 0 120 120">
        <AnimatedCircle
          cx="60"
          cy="60"
          fill={primary}
          animatedProps={animatedProps}
        />
      </Svg>
      <View
        style={{
          ...getCoverStyles(iconSize),
          backgroundColor: background, // взять фон бэка
          ...styles.backgroundCover,
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  backgroundCover: {
    position: 'absolute',
  },
});
