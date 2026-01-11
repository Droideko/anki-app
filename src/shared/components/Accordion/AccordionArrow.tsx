import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

interface AccordionArrowProps {
  isVisible?: boolean;
  onClick?: () => void;
  isExpanded: SharedValue<boolean>;
  style?: StyleProp<ViewStyle>;
}

export default function AccordionArrow({
  isVisible = true,
  onClick,
  isExpanded,
  style,
}: AccordionArrowProps) {
  const arrowRotation = useDerivedValue(() =>
    withTiming(isExpanded.value ? 180 : 0, { duration: 300 }),
  );

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${arrowRotation.value}deg` }],
  }));

  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View style={[arrowStyle, style]}>
      <Ionicons onPress={onClick} name="chevron-down" size={20} color="#fff" />
    </Animated.View>
  );
}

// const styles = StyleSheet.create({
//   chevronIcon: {
//     bottom: 0,
//     padding: 8,
//     position: 'absolute',
//     right: 0,
//     zIndex: 2,
//   },
// });
