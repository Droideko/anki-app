import { StyleProp, StyleSheet, TextStyle } from "react-native";
import { Link } from "expo-router";
import { Text } from "@/components/ThemedText";

const TermsAndPrivacyNotice = ({ style }: { style?: StyleProp<TextStyle> }) => {
  return (
    <Text style={[{ ...styles.text }, style]} variant="bodySmall">
      By signing up, you accept Anki's{" "}
      <Link style={styles.link} href={"#"}>
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link style={styles.link} href={"#"}>
        Privacy Policy
      </Link>
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginBottom: 16,
  },
  link: {
    textDecorationLine: "underline",
  },
});

export default TermsAndPrivacyNotice;
