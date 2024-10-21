import { useThemeColor } from "@/src/shared/hooks/useThemeColor";
import { ActivityIndicator } from "react-native-paper";

function LoadingIndicator() {
  const { primary } = useThemeColor();

  return <ActivityIndicator animating={true} color={primary} />;
}

export default LoadingIndicator;
