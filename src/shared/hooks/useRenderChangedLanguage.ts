import { useEffect } from 'react';

import { useLanguageStore } from '../store/useLanguageStore';

const useRenderChangedLanguage = (): void => {
  const { language } = useLanguageStore();

  useEffect(() => {}, [language]);
};

export default useRenderChangedLanguage;
