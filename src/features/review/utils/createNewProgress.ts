import { Progress } from '@shared/store/useProgressStore';

const createNewProgress = (cardId: number, userId: number) => {
  const tempId = Date.now();

  const newProgress: Progress = {
    id: Number(tempId),
    userId,
    cardId,
    easeFactor: 2.5,
    repetition: 0,
    interval: 0,
    studyProgress: 0,
    lastReviewed: null,
    nextReview: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    dirty: true,
  };
  return newProgress;
};

export default createNewProgress;
