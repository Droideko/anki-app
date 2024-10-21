import { getQueue, clearQueue } from "./requestQueue";
// import { isConnected } from "@/src/shared/hooks/useNetworkStatus";

export async function syncQueue() {
  // if (!isConnected) return;

  const queue = await getQueue();

  for (const request of queue) {
    try {
      // Выполнение запроса
      await fetch(request.url, request.options);

      // Обработка успешного ответа, обновление локальных данных
    } catch (error) {
      console.error("Ошибка при выполнении запроса из очереди:", error);
      // Останавливаем синхронизацию при ошибке
      return;
    }
  }

  // Очищаем очередь после успешной синхронизации
  await clearQueue();
}
