import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';

import { ThemedView } from '../../../shared/components/ui/ThemedView';
import { Text } from '../../../shared/components/ui/ThemedText';

import { useThemeColor } from '@shared/hooks/useThemeColor';

function FormTextDivider() {
  const { background: backgroundColor } = useThemeColor();

  return (
    <ThemedView style={styles.titleContainer}>
      <Divider style={styles.divider} />
      <Text style={{ backgroundColor, ...styles.text }} variant="bodyMedium">
        OR
      </Text>
    </ThemedView>
  );
}

export default FormTextDivider;

const styles = StyleSheet.create({
  divider: {
    position: 'absolute',
    top: '50%',
    width: '100%',
  },
  text: {
    alignSelf: 'center',
    display: 'flex',
    paddingLeft: 16,
    paddingRight: 16,
    textAlign: 'center',
  },
  titleContainer: {
    marginBottom: 16,
  },
});
