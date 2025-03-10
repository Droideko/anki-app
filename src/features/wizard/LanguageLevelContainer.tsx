import React from 'react';
import { StyleSheet, View } from 'react-native';

import CardLanguage from '@shared/components/CardLanguage';
import { CountriesName, LanguageLevel } from '@shared/types/language';
import { levelButtons } from '@features/decks/constants';

interface LanguageLevelContainerProps {
  onFinishStep: (language: LanguageLevel) => void;
}

function LanguageLevelContainer({ onFinishStep }: LanguageLevelContainerProps) {
  return (
    <View style={styles.container}>
      {levelButtons.map((language) => (
        <CardLanguage
          key={language.value}
          onPress={() => onFinishStep(language.value)}
          name={language.label}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
});

export default LanguageLevelContainer;
