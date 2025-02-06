import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolation,
  useDerivedValue,
} from 'react-native-reanimated';

const useFlipCard = () => {
  const rotation = useSharedValue(0);
  const isFlipped = useDerivedValue(() => {
    return rotation.value > 0.5;
  });

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      rotation.value,
      [0, 1],
      [0, 180],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      rotation.value,
      [0, 1],
      [180, 360],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
    };
  });

  const toggleFlip = () => {
    rotation.value = withTiming(rotation.value === 0 ? 1 : 0, {
      duration: 500,
    });
  };

  return {
    frontAnimatedStyle,
    backAnimatedStyle,
    toggleFlip,
    isFlipped,
  };
};

export default useFlipCard;
