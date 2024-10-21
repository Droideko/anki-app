import { Platform } from "react-native";

const isWeb = () => {
  return Platform.OS === "web";
};

export default isWeb;
