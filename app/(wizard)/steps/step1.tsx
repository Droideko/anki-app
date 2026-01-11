import React from 'react';

import ScrollView from '@shared/components/ScrollView';
import KeyboardAvoidingContainer from '@shared/components/KeyboardAvoidingContainer';
import LanguageContainer from '@features/wizard/LanguageContainer';
import useHandleNextStep from '@features/wizard/hooks/useHandleNextStep';
import { useUserRepository } from '@shared/hooks/repository/userRepository';
import { CountriesName } from '@shared/types/language';

export default function Step1Screen() {
  const { updateUser } = useUserRepository();

  const [selectedName, onNextStep] = useHandleNextStep(
    async (language: CountriesName) => {
      await updateUser({ targetLanguage: language });
    },
    '/(wizard)/steps/step2',
  );

  return (
    <ScrollView>
      <KeyboardAvoidingContainer>
        <LanguageContainer
          selectedName={selectedName}
          onNextStep={onNextStep}
        />
      </KeyboardAvoidingContainer>
    </ScrollView>
  );
}
