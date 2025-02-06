import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';

import { useThemeColor } from '@shared/hooks/useThemeColor';

interface OwnProps extends ButtonProps {
  children: React.ReactNode;
}

const ThemedButton = ({ children, ...props }: OwnProps) => {
  const { onPrimary, primary } = useThemeColor();

  return (
    <Button
      // buttonColor={props.buttonColor || primary} // background
      mode={props.mode || 'outlined'}
      textColor={props.textColor || onPrimary} // onSecondary
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
    fontSize: 16,
    marginBottom: 16,
  },
  contentStyle: {
    paddingBottom: 6,
    paddingTop: 6,
  },
});
