import { useCallback, useMemo, useState } from 'react';

import { Card } from '@shared/api/openaiService';

const useShowExamples = (cards: Card[]) => {
  const [expandedStates, setExpandedStates] = useState<boolean[]>(() =>
    cards.map(() => false),
  );

  const handleExpandChange = useCallback((index: number, value: boolean) => {
    setExpandedStates((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }, []);

  const allOpen = useMemo(
    () => expandedStates.every(Boolean),
    [expandedStates],
  );

  const toggleAllExamples = () => {
    setExpandedStates(Array(cards.length).fill(!allOpen));
  };

  return { expandedStates, handleExpandChange, allOpen, toggleAllExamples };
};

export default useShowExamples;
