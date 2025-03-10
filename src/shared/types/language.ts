import { popularCountryLanguages } from '@shared/constants/language';

export type LanguageLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type CardCount = 5 | 10 | 20;
export type TopicType = 'topic' | 'word';

export type CountriesId = (typeof popularCountryLanguages)[number]['id'];
export type CountriesName = (typeof popularCountryLanguages)[number]['name'];

export interface GenerateFormData {
  type: TopicType;
  topic: string;
  frontLanguage: string;
  backLanguage: string;
  languageLevel: LanguageLevel;
  count: CardCount;
  example: boolean;
  usedPhrases?: string[];
}
