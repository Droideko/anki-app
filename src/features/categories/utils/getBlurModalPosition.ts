import { ElementPosition } from "@/src/shared/store/useModalStore";
import { MenuHeight, MenuWidth } from "@/src/types/category";
import { Dimensions } from "react-native";

const TABS_MENU_HEIGHT = 50;
const OFFSET_BETWEEN_MENU_AND_ITEM = 10;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const getMenuTop = (
  elementPosition: ElementPosition | null,
  menuHeight: MenuHeight
): number => {
  if (!elementPosition) {
    return 0;
  }

  const elementBottom = elementPosition.y + elementPosition.height;
  const spaceBelow = windowHeight - elementBottom;
  const spaceAbove = elementPosition.y;

  // Determine the vertical position of the menu
  const requiredSpaceBelow =
    menuHeight + TABS_MENU_HEIGHT + OFFSET_BETWEEN_MENU_AND_ITEM;

  if (spaceBelow >= requiredSpaceBelow || spaceBelow >= spaceAbove) {
    // Enough space below or more space below than above
    return elementBottom + OFFSET_BETWEEN_MENU_AND_ITEM;
  }

  // Display the menu above the element
  return elementPosition.y - menuHeight - OFFSET_BETWEEN_MENU_AND_ITEM;
};

export const getMenuLeft = (
  elementPosition: ElementPosition | null,
  menuWidth: MenuWidth
): number => {
  if (!elementPosition) {
    return 0;
  }

  const elementRight = elementPosition.x + elementPosition.width;
  const spaceRight = windowWidth - elementRight;
  const spaceLeft = elementPosition.x;

  // Determine the horizontal position of the menu
  if (spaceRight >= 0) {
    // Enough space on the right or more space on the right than on the left
    return spaceLeft;
  }

  // Display the menu to the left of the element
  return spaceLeft - menuWidth;
};
