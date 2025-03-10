import React from 'react';
import { StyleSheet, View, LayoutChangeEvent, Pressable } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../ui/ThemedText';

interface AccordionItemProps {
  isExpanded: SharedValue<boolean>;
  title: string;
  duration?: number;
  children: React.ReactNode;
}

export function AccordionItem({
  isExpanded,
  title,
  children,
  duration = 300,
}: AccordionItemProps) {
  const contentHeight = useSharedValue(0);

  // Анимированная высота: 0, если закрыто, или contentHeight, если открыто
  const animatedHeight = useDerivedValue(() => {
    return withTiming(isExpanded.value ? contentHeight.value : 0, { duration });
  });

  // Опционально: анимация поворота стрелочки (0 -> 180 градусов)
  const arrowRotation = useDerivedValue(() => {
    return withTiming(isExpanded.value ? 180 : 0, { duration });
  });

  const containerStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    overflow: 'hidden',
  }));

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${arrowRotation.value}deg` }],
  }));

  // При первом рендере контента измеряем его высоту и записываем в contentHeight
  const onLayoutContent = (e: LayoutChangeEvent) => {
    contentHeight.value = e.nativeEvent.layout.height;
  };

  const onHeaderPress = () => {
    isExpanded.value = !isExpanded.value;
  };

  return (
    <View>
      <Pressable onPress={onHeaderPress} style={styles.header}>
        <Text style={styles.title} variant="titleMedium">
          {title}
        </Text>
        <Animated.View style={arrowStyle}>
          <Ionicons name="chevron-down" size={20} color="#fff" />
        </Animated.View>
      </Pressable>

      <Animated.View style={containerStyle}>
        <View onLayout={onLayoutContent} style={styles.contentWrapper}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    display: 'flex',
    position: 'absolute',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  title: {
    fontWeight: '600',
  },
});
