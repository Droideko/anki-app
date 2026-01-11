import { create } from 'zustand';

export const ProgressStatus = {
  NEW: 'NEW',
  LEARNING: 'LEARNING',
  REVIEWING: 'REVIEWING',
  MASTERED: 'MASTERED',
} as const;

export type ProgressStatusValues =
  (typeof ProgressStatus)[keyof typeof ProgressStatus];

export interface Progress {
  id: number;
  userId: number;
  cardId: number;

  easeFactor: number; // 2.5 по умолчанию
  repetition: number;
  interval: number; // в днях
  studyProgress: number; // (0..100)
  lastReviewed: Date | null;
  nextReview: Date | null;

  createdAt: string;
  updatedAt: string;
  dirty?: boolean;
}

interface ProgressState {
  progressByCardId: Record<number, Progress>;
  // Можно использовать ключ cardId, если 1 user => 1 progress
}

interface ProgressActions {
  setProgress: (progresses: Progress[]) => void;
  updateProgress: (progress: Progress) => void;
  // при необходимости: deleteProgress и т.д.
}

export const useProgressStore = create<ProgressState & ProgressActions>(
  (set) => ({
    progressByCardId: {},
    setProgress: (progresses) =>
      set(({ progressByCardId }) => {
        const newProgressByCardId = { ...progressByCardId };
        for (const p of progresses) {
          newProgressByCardId[p.cardId] = p;
        }
        return { progressByCardId: newProgressByCardId };
      }),
    updateProgress: (progress) =>
      set((state) => ({
        progressByCardId: {
          ...state.progressByCardId,
          [progress.cardId]: progress,
        },
      })),
  }),
);
