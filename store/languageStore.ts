import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "@/global/i18n";

interface LanguageState {
  language: string;
  setLanguage: (newLanguage: string) => Promise<void>;
  initializeLanguage: () => Promise<void>;
}

// Создание Zustand хранилища
const useLanguageStore = create<LanguageState>((set) => ({
  language: i18n.locale, // Изначально берем текущий язык устройства
  setLanguage: async (newLanguage: string) => {
    i18n.locale = newLanguage;
    set({ language: newLanguage });
    await AsyncStorage.setItem("language", newLanguage); // Сохранение выбора пользователя
  },
  initializeLanguage: async () => {
    const storedLanguage = await AsyncStorage.getItem("language");
    if (storedLanguage) {
      i18n.locale = storedLanguage; // Установка сохраненного языка
      set({ language: storedLanguage });
    }
  },
}));

export { useLanguageStore, i18n };
