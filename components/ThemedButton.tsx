import { useThemeColor } from "@/hooks/useThemeColor";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Button, ButtonProps } from "react-native-paper";

interface OwnProps extends ButtonProps {
  children: React.ReactNode;
}

const ThemedButton = ({ children, ...props }: OwnProps) => {
  const { onSecondary, background } = useThemeColor();

  return (
    <Button
      buttonColor={props.buttonColor || background}
      mode={props.mode || "outlined"}
      textColor={props.textColor || onSecondary}
      style={[{ ...styles.button }, props.style]}
      contentStyle={styles.contentStyle}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  button: {
    marginBottom: 16,
    fontSize: 16,
  },
  contentStyle: {
    paddingBottom: 6,
    paddingTop: 6,
  },
});
