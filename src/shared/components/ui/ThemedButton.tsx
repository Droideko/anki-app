import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';

import { useThemeColor } from '@shared/hooks/useThemeColor';

interface ThemedButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const ThemedButton = ({
  children,
  mode = 'outlined',
  style,
  labelStyle,
  textColor,
  buttonColor,
  ...rest
}: ThemedButtonProps) => {
  const { onPrimary, primary } = useThemeColor();

  return (
    <Button
      // buttonColor={buttonColor || primary} // background
      mode={mode || 'outlined'}
      textColor={textColor || onPrimary}
      style={[styles.button, style]}
      contentStyle={styles.contentStyle}
      labelStyle={[styles.label, labelStyle]}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  button: {
    fontSize: 16,
    marginBottom: 16,
  },
  contentStyle: {
    paddingBottom: 6,
    paddingTop: 6,
  },
  label: {
    fontSize: 16,
  },
});
