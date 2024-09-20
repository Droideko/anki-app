import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemeTypes } from "@/constants/Colors";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  const { background: backgroundColor } = useThemeColor();

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
