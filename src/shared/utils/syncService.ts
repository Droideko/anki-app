import { getQueue, clearQueue } from './requestQueue';
// import { isConnected } from "@/src/shared/hooks/useNetworkStatus";

export async function syncQueue() {
  // if (!isConnected) return;

  const queue = await getQueue();

  for (const request of queue) {
    try {
      // Executing the request
      await fetch(request.url, request.options);

      // Handling a successful response, updating local data
    } catch (error) {
      console.error('Error executing request from the queue:', error);
      return;
    }
  }

  // Clear the queue after successful synchronization
  await clearQueue();
}
