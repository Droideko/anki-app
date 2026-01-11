import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import Search from '@shared/components/Search';
import CardLanguage from '@shared/components/CardLanguage';
import { CountriesName } from '@shared/types/language';
import { popularCountryLanguages } from '@shared/constants/language';

interface LanguageContainerProps {
  onSelect: (name: CountriesName) => void;
  selectedName?: CountriesName;
}

export default function SelectLanguage({
  onSelect,
  selectedName,
}: LanguageContainerProps) {
  const [search, setSearch] = useState('');

  const filteredLanguages = useMemo(() => {
    return popularCountryLanguages.filter((lang) =>
      lang.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <View>
      <FlatList
        ListHeaderComponent={
          <Search style={styles.searchStyle} onChange={setSearch} />
        }
        contentContainerStyle={styles.listContent}
        data={filteredLanguages}
        renderItem={({ item: { id, name } }) => (
          <CardLanguage
            selectedName={selectedName}
            key={id}
            name={name}
            onPress={() => onSelect(name)}
          />
        )}
        windowSize={6}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 60,
    padding: 12,
  },
  searchStyle: {
    marginBottom: 12,
  },
});
