import React, { useState } from 'react';
import { LayoutRectangle, StyleSheet } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {
  getMenuLeft,
  getMenuTop,
} from '@features/categories/utils/getBlurModalPosition';
import { useModalStore } from '@shared/store/useModalStore';
import { useThemeColor } from '@shared/hooks/useThemeColor';
import { BrandedMenuSize } from '@features/categories/types';

interface ModalMenuWrapperProps {
  scale: SharedValue<number>;
  children: React.ReactNode;
}

export default function ModalMenuWrapper({
  scale,
  children,
}: ModalMenuWrapperProps) {
  const { elementPosition } = useModalStore();
  const { elevation } = useThemeColor();

  const [menuSizes, setMenuSize] = useState<BrandedMenuSize>({
    height: 0,
    width: 0,
  } as BrandedMenuSize);

  const onMenuLayout = (event: {
    nativeEvent: { layout: LayoutRectangle };
  }) => {
    const { width, height } = event.nativeEvent.layout;
    setMenuSize({ width, height } as BrandedMenuSize);
  };

  const animatedMenuStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
  }));

  return (
    <Animated.View
      onLayout={onMenuLayout}
      style={[
        styles.menu,
        animatedMenuStyle,
        {
          backgroundColor: elevation.level1,
          top: getMenuTop(elementPosition, menuSizes.height),
          left: getMenuLeft(elementPosition, menuSizes.width),
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  menu: {
    borderRadius: 5,
    elevation: 5,
    position: 'absolute',
    width: 150,
  },
});
