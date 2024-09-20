import React from "react";
import { Card, Divider } from "react-native-paper";
import { useLanguageStore } from "@/store/languageStore";
import { Link } from "expo-router";
import { ThemedView } from "../ThemedView";
import { Text } from "../ThemedText";
import { StyleSheet, View } from "react-native";
import CustomSwitch from "../CustomSwitch";
import CardSwitchTheme from "./CardItem/CardSwitchTheme";
import CardSwitchNotification from "./CardItem/CardSwitchNotification";
import LanguageList from "./LanguageList";

function CardItem() {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
      }}
    >
      <Text variant="bodyLarge">Night theme</Text>
      <CustomSwitch />
    </View>
  );
}

export default function LanguageSetting() {
  return (
    <ThemedView style={styles.container}>
      <LanguageList />
      <Card>
        <Card.Content>
          <CardSwitchTheme />
          <Divider style={{ marginBottom: 10, marginTop: 10 }} />
          <CardSwitchNotification />
        </Card.Content>
      </Card>
      <Link href="/login">Log In</Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
});
