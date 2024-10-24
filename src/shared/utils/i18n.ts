import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

import { en } from '../../../assets/locales/en';
import { ru } from '../../../assets/locales/ru';
import { de } from '../../../assets/locales/de';

const i18n = new I18n({ en, ru, de });

i18n.locale = getLocales()[0]?.languageCode ?? 'en';
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

export default i18n;
