import React from 'react';
import { Card, Divider } from 'react-native-paper';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import CardSwitchTheme from '@features/settings/components/CardSwitchTheme';
import CardSwitchNotification from '@features/settings/components/CardSwitchNotification';
import LanguageList from '@features/settings/components/LanguageList';
import { ThemedView } from '@shared/components/ui/ThemedView';
import { Text } from '@shared/components/ui/ThemedText';

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
      <Link href="/login">
        <Text>Log In</Text>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 12,
  },
});
