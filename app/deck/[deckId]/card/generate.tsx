import React from 'react';

import KeyboardAvoidingContainer from '@shared/components/KeyboardAvoidingContainer';
import GenerateContainer from '@features/decks/components/GenerateContainer';
import ScrollView from '@shared/components/ScrollView';
import { ThemedView } from '@shared/components/ui/ThemedView';

export default function Generate() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <KeyboardAvoidingContainer offsetIOS={90}>
        {/* <ScrollView> */}
        <GenerateContainer />
        {/* </ScrollView> */}
      </KeyboardAvoidingContainer>
    </ThemedView>
  );
}
