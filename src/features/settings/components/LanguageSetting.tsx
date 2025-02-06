import React from 'react';
import { Card, Divider, ProgressBar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import CardSwitchTheme from '@features/settings/components/CardSwitchTheme';
import CardSwitchNotification from '@features/settings/components/CardSwitchNotification';
import LanguageList from '@features/settings/components/LanguageList';
import { ThemedView } from '@shared/components/ui/ThemedView';

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
      <ProgressBar indeterminate />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1
    // padding: 12,
  },
});
