import { useCallback, useState } from 'react';

const useRefresh = (
  asyncFunctions: Array<() => Promise<unknown>>,
): [boolean, () => void] => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await Promise.all(asyncFunctions.map((fn) => fn()));
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  }, [asyncFunctions]);

  return [refreshing, onRefresh];
};

export default useRefresh;
