import React from "react";
import { Card, Divider } from "react-native-paper";
import { Link } from "expo-router";
import { ThemedView } from "../../../shared/components/ui/ThemedView";
import { StyleSheet, View } from "react-native";
import CardSwitchTheme from "./CardSwitchTheme";
import CardSwitchNotification from "./CardSwitchNotification";
import LanguageList from "./LanguageList";

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
    // flex: 1,
    // padding: 12,
  },
});
