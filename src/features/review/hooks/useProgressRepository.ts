import withErrorHandling from '@features/categories/utils/withErrorHandling';
import { progressService } from '@shared/api/progressService';
import { Progress, useProgressStore } from '@shared/store/useProgressStore';

export const useProgressRepository = () => {
  const { setProgress, updateProgress, progressByCardId } = useProgressStore();

  const saveProgressLocally = async (progress: Progress) => {
    // 1. Сохраняем в Zustand
    updateProgress(progress);
    // 2. Сохраняем в SQLite
    // await progressSQLiteService.saveLocalProgress(progress);
  };

  const syncProgress = async () => {
    // 1. Получаем из SQLite все dirty-записи
    // const dirty = await progressSQLiteService.getDirtyProgress();
    const dirtyProgress = Object.values(progressByCardId).filter(
      (p) => p.dirty,
    );

    console.log(dirtyProgress);

    if (!dirtyProgress.length) return;

    // 2. Отправляем одним запросом на сервер
    // Предположим, что сервер принимает массив

    console.log('syncProgress', dirtyProgress);

    const updatedProgress = await progressService.batchProgress({
      items: dirtyProgress,
    });

    console.log(updatedProgress);

    setProgress(updatedProgress);

    // // 3. Обновляем локально (Zustand + SQLite) записи, убирая dirty
    // // Предположим, что сервер вернул актуальные объекты
    // for (const p of updated) {
    //   updateProgress(p);
    //   // clear dirty
    //   // await progressSQLiteService.clearDirty(p.cardId);
    // }
  };

  // Загрузка прогресса (например, для одной колоды)
  const fetchDeckProgress = async (deckId: number) => {
    return withErrorHandling(async () => {
      // const progresses = await srsService.getDeckProgress(deckId);
      // допустим, сервер вернёт [{ id, cardId, ... }, ...]
      // setProgress(progresses);
      // return progresses;
    });
  };

  // Обновление прогресса карточки
  const patchProgress = async (progressId: number, data: Partial<Progress>) => {
    return withErrorHandling(async () => {
      // const updated = await srsService.patchProgress(progressId, data);
      // updateProgress(updated);
      // return updated;
    });
  };

  return {
    saveProgressLocally,
    fetchDeckProgress,
    patchProgress,
    syncProgress,
  };
};
