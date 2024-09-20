import * as React from "react";
import { Switch } from "react-native-paper";
import { useTheme } from "../CustomThemeProvide";

const NotificationSwitch = () => {
  const [isToggled, setToggle] = React.useState(false);

  return <Switch value={isToggled} onValueChange={setToggle} />;
};

export default NotificationSwitch;
