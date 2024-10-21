import * as React from "react";
import { Switch } from "react-native-paper";

const NotificationSwitch = () => {
  const [isToggled, setToggle] = React.useState(false);

  return <Switch value={isToggled} onValueChange={setToggle} />;
};

export default NotificationSwitch;
