import React, { useState } from 'react';
import { LayoutRectangle, StyleSheet } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import CategoryModalMenuContent from '@features/categories/components/CategoryModalMenuContent';
import {
  getMenuLeft,
  getMenuTop,
} from '@features/categories/utils/getBlurModalPosition';
import { useModalStore } from '@shared/store/useModalStore';
import { useThemeColor } from '@shared/hooks/useThemeColor';
import { BrandedMenuSize } from '@features/categories/types';

interface CategoryModalMenuProps {
  scale: SharedValue<number>;
}

export default function CategoryModalMenu({ scale }: CategoryModalMenuProps) {
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
      <CategoryModalMenuContent />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  menu: {
    borderRadius: 5,
    elevation: 5,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: 150,
  },
});
