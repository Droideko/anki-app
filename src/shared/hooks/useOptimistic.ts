import { useState, useEffect, useCallback, useRef } from 'react';

export function useOptimistic<T>(
  initialValue: T,
  updateCallback: (newValue: T) => Promise<void>,
): [T, (newValue: T) => Promise<void>] {
  const [value, setValue] = useState<T>(initialValue);
  const committedRef = useRef<T>(initialValue);

  useEffect(() => {
    setValue(initialValue);
    committedRef.current = initialValue;
  }, [initialValue]);

  const updateOptimistic = useCallback(
    async (newValue: T): Promise<void> => {
      const previousValue = committedRef.current;
      setValue(newValue);

      try {
        await updateCallback(newValue);
        committedRef.current = newValue;
      } catch (error) {
        setValue(previousValue);
        throw error;
      }
    },
    [updateCallback],
  );

  return [value, updateOptimistic];
}
