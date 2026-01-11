import NetInfo from '@react-native-community/netinfo';

const executeWithNetworkFallback = async <T>(
  serverFunction: () => Promise<T>,
  databaseFunction: () => Promise<T>,
): Promise<T> => {
  const { isConnected } = await NetInfo.fetch();

  if (isConnected) {
    return await serverFunction();
  } else {
    return await databaseFunction();
  }
};

export default executeWithNetworkFallback;
