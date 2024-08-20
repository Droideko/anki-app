import * as React from "react";
import { Switch } from "react-native-paper";
import { useTheme } from "../CustomThemeProvide";

const CustomSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return <Switch value={theme.dark} onValueChange={() => toggleTheme()} />;
};

export default CustomSwitch;
