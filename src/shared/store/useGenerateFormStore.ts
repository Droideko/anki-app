import { create } from 'zustand';

import { CardCount, LanguageLevel, TopicType } from '@shared/types/language';

// export type TopicType = 'topic' | 'word';
// export type LanguageLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
// export type CountOption = 5 | 10 | 20;

export interface FormState {
  type: TopicType;
  frontLanguage: string;
  backLanguage: string;
  languageLevel: LanguageLevel;
  count: CardCount;
  example: boolean;
  usedPhrases: string[];
  updateForm: (data: Partial<FormState>) => void;
  addPhrases: (newPhrases: string[]) => void;
  // setTopic: (topic: TopicType) => void;
  // setName: (name: string) => void;
  // setFrontLanguage: (lang: string) => void;
  // setBackLanguage: (lang: string) => void;
  // setLanguageLevel: (level: LanguageLevel) => void;
  // setCount: (count: CardCount) => void;
  // setExample: (example: boolean) => void;
}

export const useFormStore = create<FormState>((set) => ({
  type: 'topic',
  frontLanguage: 'German',
  backLanguage: 'Russian',
  languageLevel: 'A2',
  count: 10,
  example: false,
  usedPhrases: [],
  updateForm: (data) => set((state) => ({ ...state, ...data })),
  addPhrases: (newPhrases) =>
    set((state) => {
      const combined = [...state.usedPhrases, ...newPhrases];
      const uniquePhrases = [...new Set(combined)];
      return { usedPhrases: uniquePhrases };
    }),
  // setTopic: (topic) => set({ topic }),
  // setName: (name) => set({ name }),
  // setFrontLanguage: (lang) => set({ frontLanguage: lang }),
  // setBackLanguage: (lang) => set({ backLanguage: lang }),
  // setLanguageLevel: (level) => set({ languageLevel: level }),
  // setCount: (count) => set({ count }),
  // setExample: (example) => set({ example }),
}));
