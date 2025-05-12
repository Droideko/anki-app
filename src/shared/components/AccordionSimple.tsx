import React from 'react';
import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface AccordionSimpleProps {
  open: Animated.SharedValue<boolean>;
  duration?: number;
  children: React.ReactNode;
}

export default function AccordionSimple({
  open,
  duration = 300,
  children,
}: AccordionSimpleProps) {
  const contentHeight = useSharedValue(0);

  const animatedHeight = useDerivedValue(() => {
    return withTiming(open.value ? contentHeight.value : 0, { duration });
  });

  const containerStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    overflow: 'hidden',
  }));

  const onLayoutContent = (e: LayoutChangeEvent) => {
    contentHeight.value = e.nativeEvent.layout.height;
  };

  return (
    <Animated.View style={containerStyle}>
      <View onLayout={onLayoutContent} style={styles.contentWrapper}>
        {children}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    display: 'flex',
    position: 'absolute',
    width: '100%',
  },
});