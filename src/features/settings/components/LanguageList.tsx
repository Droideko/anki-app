import React from 'react';
import { List } from 'react-native-paper';

import i18n from '@shared/utils/i18n';
import { useLanguageStore } from '@shared/store/useLanguageStore';

function LanguageList() {
  const { setLanguage } = useLanguageStore();

  return (
    <List.Section>
      <List.Accordion title="Language">
        <List.Item
          onPress={() => setLanguage('en')}
          title={i18n.t('settings.english')}
          description="English"
          // right={(props) => <List.Icon {...props} icon="folder" />}
        />
        <List.Item
          onPress={() => setLanguage('de')}
          title={i18n.t('settings.german')}
          description="Deutsch"
        />
        <List.Item
          onPress={() => setLanguage('ru')}
          title={i18n.t('settings.russian')}
          description="Русский"
        />
      </List.Accordion>
    </List.Section>
  );
}

export default LanguageList;
