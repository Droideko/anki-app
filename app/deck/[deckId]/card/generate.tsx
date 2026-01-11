import React from 'react';

import KeyboardAvoidingContainer from '@shared/components/KeyboardAvoidingContainer';
import GenerateContainer from '@features/decks/components/GenerateContainer';
import { ThemedView } from '@shared/components/ui/ThemedView';

export default function Generate() {
  return (
    <>
      <ThemedView style={{ flex: 1 }}>
        <KeyboardAvoidingContainer offsetIOS={90}>
          <GenerateContainer />
        </KeyboardAvoidingContainer>
      </ThemedView>
    </>
  );
}
