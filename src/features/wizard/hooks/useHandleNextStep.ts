import { useState } from 'react';
import { Href, router } from 'expo-router';

import { CountriesName } from '../constants';

import { useAsyncFn } from '@shared/hooks/useAsyncFn';

const useHandleNextStep = (
  callback: (language: CountriesName) => Promise<void>,
  route: Href,
) => {
  const [selectedName, setSelectedName] = useState<CountriesName | null>(null);

  const [_, onNextStep] = useAsyncFn(async (language: CountriesName) => {
    setSelectedName(language);

    await callback(language);

    router.push(route);
  });

  return [selectedName, onNextStep] as const;
};

export default useHandleNextStep;
