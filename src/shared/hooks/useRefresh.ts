import { useCallback, useState } from 'react';

const useRefresh = <T>(
  asyncFunction: () => Promise<T>,
): [boolean, () => void] => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await asyncFunction();
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  }, [asyncFunction]);

  return [refreshing, onRefresh];
};

export default useRefresh;
