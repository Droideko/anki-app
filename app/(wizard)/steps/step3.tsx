import React from 'react';
import { router } from 'expo-router';

import ScrollView from '@shared/components/ScrollView';
import KeyboardAvoidingContainer from '@shared/components/KeyboardAvoidingContainer';
import { useUserRepository } from '@shared/hooks/repository/userRepository';
import { useAsyncFn } from '@shared/hooks/useAsyncFn';
import { LanguageLevel } from '@shared/types/language';
import LanguageLevelContainer from '@features/wizard/LanguageLevelContainer';

export default function Step3Screen() {
  const { updateUser } = useUserRepository();

  const [_, onFinishStep] = useAsyncFn(async (languageLevel: LanguageLevel) => {
    await updateUser({ languageLevel });

    router.replace('/(wizard)/steps/step4');
  });

  return (
    <ScrollView>
      <KeyboardAvoidingContainer style={{ justifyContent: 'center' }}>
        <LanguageLevelContainer onFinishStep={onFinishStep} />
      </KeyboardAvoidingContainer>
    </ScrollView>
  );
}
