import { CountriesName } from '@shared/types/language';

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

export const speechLanguages: Record<CountriesName, string> = {
  English: 'en-US',
  German: 'de-DE',
  Russian: 'ru-RU',
  French: 'fr',
  Spanish: 'es',
  Portuguese: 'pt',
  Chinese: 'zh',
  Japanese: 'ja',
  Arabic: 'ar',
  Hindi: 'hi',
};

export const speechLanguagesList: Record<string, CountriesName> = {
  'en-US': 'English',
  'de-DE': 'German',
  'ru-RU': 'Russian',
  fr: 'French',
  es: 'Spanish',
  pt: 'Portuguese',
  zh: 'Chinese',
  ja: 'Japanese',
  ar: 'Arabic',
  hi: 'Hindi',
};
