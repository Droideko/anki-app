import AsyncStorage from '@react-native-async-storage/async-storage';

const QUEUE_KEY = 'REQUEST_QUEUE';

export async function addToQueue(request: unknown) {
  const queue = await getQueue();
  queue.push(request);
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

export async function getQueue() {
  const queueString = await AsyncStorage.getItem(QUEUE_KEY);
  return queueString ? JSON.parse(queueString) : [];
}

export async function clearQueue() {
  await AsyncStorage.removeItem(QUEUE_KEY);
}
