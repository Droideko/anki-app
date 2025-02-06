const STALE_TIME = 5 * 4 * 1000; // 5 min

const isDataStale = (lastFetched?: string): boolean => {
  if (!lastFetched) return true;
  const now = Date.now();
  const lastFetchedTime = new Date(lastFetched).getTime();
  return now - lastFetchedTime > STALE_TIME;
};

export default isDataStale;
