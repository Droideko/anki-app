import React, { useEffect } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withRepeat,
  useDerivedValue,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

import { useThemeColor } from '@shared/hooks/useThemeColor';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ICON_PADDING_RATIO = 0.2;
const CIRCLE_ANIMATION = {
  DURATION: 2000,
  REPEAT: -1,
};

export function WaveCircle({ iconSize }: { iconSize: number }) {
  const { primary, background } = useThemeColor();
  const animation = useSharedValue(0);

  const radius = useDerivedValue(() => 60 * animation.value);
  const opacity = useDerivedValue(() => 1 - animation.value);

  const animatedProps = useAnimatedProps(() => ({
    r: radius.value,
    opacity: opacity.value,
  }));

  useEffect(() => {
    animation.value = withRepeat(
      withTiming(1, {
        duration: CIRCLE_ANIMATION.DURATION,
        easing: Easing.out(Easing.ease),
      }),
      CIRCLE_ANIMATION.REPEAT,
    );
  }, [animation]);

  const coverStyles: StyleProp<ViewStyle> = {
    width: iconSize - iconSize * ICON_PADDING_RATIO,
    height: iconSize - iconSize * ICON_PADDING_RATIO,
    borderRadius: (iconSize - iconSize * ICON_PADDING_RATIO) / 2,
    backgroundColor: background,
    position: 'absolute',
  };

  const viewBoxSize = iconSize * 2;
  const center = viewBoxSize / 2;

  return (
    <>
      <Svg
        style={StyleSheet.absoluteFill}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      >
        <AnimatedCircle
          cx={center}
          cy={center}
          fill={primary}
          animatedProps={animatedProps}
        />
      </Svg>
      <View style={coverStyles} />
    </>
  );
}
