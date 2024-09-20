import * as React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IconButton, IconButtonProps, Icon } from "react-native-paper";

const ThemedIconButton = (props: Omit<IconButtonProps, "iconColor">) => {
  const { primary } = useThemeColor();

  return <IconButton iconColor={primary} {...props} />;
};

export default ThemedIconButton;
