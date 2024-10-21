import { Text as DefaultText, TextProps } from "react-native-paper";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";

export function Text({ style, ...rest }: TextProps<string>) {
  const { text } = useThemeColor();

  return <DefaultText style={[{ color: text }, style]} {...rest} />;
}
