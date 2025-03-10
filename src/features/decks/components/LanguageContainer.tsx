import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';

import Search from '@shared/components/Search';
import { useFormStore } from '@shared/store/useGenerateFormStore';
import CardLanguage from '@shared/components/CardLanguage';

export const popularCountryLanguages = [
  { id: 'en', name: 'English' },
  { id: 'es', name: 'Spanish' },
  { id: 'zh', name: 'Chinese' },
  { id: 'hi', name: 'Hindi' },
  { id: 'ar', name: 'Arabic' },
  { id: 'pt', name: 'Portuguese' },
  { id: 'ru', name: 'Russian' },
  { id: 'ja', name: 'Japanese' },
  { id: 'de', name: 'German' },
  { id: 'fr', name: 'French' },
] as const;

type CountriesName = (typeof popularCountryLanguages)[number]['name'];

export default function LanguageContainer() {
  const [search, setSearch] = useState('');
  const { type } = useLocalSearchParams<{ type: string }>();
  const { updateForm, frontLanguage, backLanguage } = useFormStore();

  const filteredLanguages = useMemo(() => {
    return popularCountryLanguages.filter((lang) =>
      lang.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const isFrontType = type === 'front';

  const onLanguageSelect = (languageName: CountriesName) => {
    const key = isFrontType ? 'frontLanguage' : 'backLanguage';
    updateForm({ [key]: languageName });
    router.back();
  };

  const currentLanguage = isFrontType ? frontLanguage : backLanguage;

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
            selectedName={currentLanguage}
            key={id}
            name={name}
            onPress={() => onLanguageSelect(name)}
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
