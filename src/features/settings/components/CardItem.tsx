import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Text } from "react-native-paper";

interface CardItem {
  leftText: string;
  rightComponent: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function CardItem({ leftText, rightComponent, style }: CardItem) {
  return (
    <View style={[styles.container, style]}>
      <Text variant="bodyLarge">{leftText}</Text>
      {rightComponent}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 16,
  },
});
