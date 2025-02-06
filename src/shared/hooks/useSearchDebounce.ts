import { useState } from 'react';
import { DebouncedState, useDebouncedCallback } from 'use-debounce';

const useSearchDebounce = (): [
  string,
  DebouncedState<(value: string) => void>,
] => {
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
  }, 300);

  return [searchQuery, debouncedSearch];
};

export default useSearchDebounce;
