import { useState } from "react";
import { LayoutRectangle, StyleSheet } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  getMenuLeft,
  getMenuTop,
} from "@/src/features/categories/utils/getBlurModalPosition";
import { useModalStore } from "@/src/shared/store/useModalStore";
import { MenuHeight, MenuWidth } from "@/src/types/category";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";
import CategoryModalMenuContent from "./CategoryModalMenuContent";

type BrandedMenuSize = {
  height: MenuHeight;
  width: MenuWidth;
};

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
  menu: {
    position: "absolute",
    borderRadius: 5,
    width: 150,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Elevation для Android
    elevation: 5,
  },
});
