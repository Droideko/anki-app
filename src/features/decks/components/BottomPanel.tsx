import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Icon } from 'react-native-paper';

import { useThemeColor } from '@shared/hooks/useThemeColor';
import { Text } from '@shared/components/ui/ThemedText';

interface BottomPanelProps {
  visible: boolean;
  onSelectAll: () => void;
  onDelete: () => void;
  onReverse: () => void;
}

const { height } = Dimensions.get('window');

export default function BottomPanel({
  visible,
  onSelectAll,
  onDelete,
  onReverse,
}: BottomPanelProps) {
  const { elevation, error, primary } = useThemeColor();

  const translateY = useSharedValue(height);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, {
        duration: 350,
        easing: Easing.out(Easing.ease),
      });
      opacity.value = withTiming(1, { duration: 350 });
    } else {
      translateY.value = withTiming(height, {
        duration: 300,
        easing: Easing.in(Easing.ease),
      });
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [opacity, translateY, visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  if (!visible && opacity.value === 0) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        animatedStyle,
        { backgroundColor: elevation.level1 },
      ]}
    >
      <TouchableOpacity onPress={onDelete}>
        <Icon size={28} source="delete" color={error} />
      </TouchableOpacity>

      <Text
        variant="bodyLarge"
        onPress={onSelectAll}
        style={{ color: primary }}
      >
        Select All
      </Text>

      <TouchableOpacity onPress={onReverse}>
        <Icon size={28} source="swap-horizontal" color={primary} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    bottom: 0,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 0,
    paddingBottom: 45,
    padding: 15,
    position: 'absolute',
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    zIndex: 10,
  },
});
