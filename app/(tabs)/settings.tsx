import React from 'react';
import { StyleSheet } from 'react-native';

import { ThemedView } from '@shared/components/ui/ThemedView';
import LanguageSetting from '@features/settings/components/LanguageSetting';
import LogOutButton from '@features/settings/components/LogOutButton';
import DeleteAccountButton from '@features/settings/components/DeleteAccountButton';

export default function SettingsScreen() {
  return (
    <ThemedView style={styles.container}>
      <LanguageSetting />
      <LogOutButton />
      <DeleteAccountButton />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
});
