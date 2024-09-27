import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { useThemeColor } from "./useThemeColor";

const useStackScreenOptions = (): NativeStackNavigationOptions => {
  const colors = useThemeColor();

  return {
    headerStyle: {
      backgroundColor: colors.background,
    },
    headerTintColor: colors.primary,
    headerShown: false,
  };
};

export default useStackScreenOptions;
