import React, { useMemo, useState } from 'react';
import { View } from 'react-native';

import CardLanguage from '@shared/components/CardLanguage';
import Search from '@shared/components/Search';
import { popularCountryLanguages } from '@shared/constants/language';
import { CountriesName } from '@shared/types/language';

interface LanguageContainerProps {
  selectedName: CountriesName | null;
  onNextStep: (language: CountriesName) => void;
}

function LanguageContainer({
  selectedName,
  onNextStep,
}: LanguageContainerProps) {
  const [search, setSearch] = useState('');

  const filteredLanguages = useMemo(() => {
    return popularCountryLanguages.filter((lang) =>
      lang.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <View style={{ marginBottom: 40 }}>
      <Search style={{ marginBottom: 12 }} onChange={setSearch} />
      {filteredLanguages.map((lang) => (
        <CardLanguage
          key={lang.id}
          selectedName={selectedName}
          onPress={() => onNextStep(lang.name)}
          name={lang.name}
        />
      ))}
    </View>
  );
}

export default LanguageContainer;
