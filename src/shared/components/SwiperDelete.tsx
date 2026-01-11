import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { Text } from './ui/ThemedText';

export default function SwiperDelete(
  progress: SharedValue<number>,
  drag: SharedValue<number>,
) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      // transform: [{ translateX: drag.value / 2 }],
      opacity: drag.value < 0 ? Math.min(-drag.value / 80, 1) : 0,
    };
  });

  return (
    <Animated.View style={[styles.rightAction, animatedStyle]}>
      <Text style={styles.actionText}>🗑</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  actionText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  rightAction: {
    alignItems: 'center',
    backgroundColor: '#dd2c00',
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: 'center',
    marginBottom: 8,
    width: 100,
  },
});
