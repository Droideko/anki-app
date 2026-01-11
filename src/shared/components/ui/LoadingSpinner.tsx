import React from 'react';
import { StyleSheet, View } from 'react-native';

import LoadingIndicator from './LoadingIndicator';

export default function LoadingSpinner() {
  return (
    <View style={styles.container}>
      <LoadingIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
