import React from 'react';
import { StyleSheet } from 'react-native';

import KeyboardAvoidingContainer from '@shared/components/KeyboardAvoidingContainer';
import useSegmentedButtons from '@features/categories/hooks/useSegmentedButtons';
import { ThemedView } from '@shared/components/ui/ThemedView';
import { KEYBOARD_OFFSET_IOS } from '@features/categories/constants';
import { Text } from '@shared/components/ui/ThemedText';

export default function CreateDeckOrSubcategory() {
  const [value, onChange] = useSegmentedButtons();

  return (
    <KeyboardAvoidingContainer offsetIOS={KEYBOARD_OFFSET_IOS}>
      <ThemedView style={styles.container}>
        <Text>Test</Text>
      </ThemedView>
    </KeyboardAvoidingContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  iconCreate: {
    bottom: 0,
    position: 'absolute',
    right: 0,
  },
});
