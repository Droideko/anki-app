import { Progress } from './../store/useProgressStore';

type ValueOf<T> = T[keyof T];

export const RATING_MAPPER = {
  again: 0,
  hard: 1,
  good: 2,
  easy: 3,
} as const;

export type Rating = ValueOf<typeof RATING_MAPPER>;

type SrsUpdateInput = Pick<
  Progress,
  'easeFactor' | 'repetition' | 'interval' | 'studyProgress'
>;

type SrsUpdateOutput = Omit<
  Progress,
  'cardId' | 'userId' | 'createdAt' | 'updatedAt' | 'id'
> & { rating: Rating; isUrgent: boolean };

// rating - числовое значение от 0 до 3 ( 0- hard, 3 - easy )

// interval - Число, определяющее количество дней до следующего показа карточки
// (Если пользователь отвечает правильно, интервал увеличивается)
// (Если он ошибается, интервал сбрасывается или назначается моментальное повторение)

// easeFactor (eF) коэффициент легкости - Значение, которое определяет, насколько быстро увеличиваются интервалы для конкретной карточки.
// Начальное значение: 2.5. Меняется в зависимости от рейтинга карточки.

// repetition - счетчик повторений (Число повторений карточки.)
// Используется для статистики и для применения фиксированных интервалов на начальных этапах (например, 1 и 6 дней).

// (возможно добавить studyProgress) Число от 0 до 100, отражающее, насколько хорошо пользователь выучил карточку.

// lastReviewed дата последнего повторения  показывающая, когда карточка была в последний раз показана.

// nextReview дата следующего повторения lastReviewed + interval

// (isUrgent) флаг для моментального повторения

const MIN_EF = 1.3;

const ANSWER = {
  isAgain: (r: Rating) => r === RATING_MAPPER.again,
  isHard: (r: Rating) => r === RATING_MAPPER.hard,
  isGood: (r: Rating) => r === RATING_MAPPER.good,
  isEasy: (r: Rating) => r === RATING_MAPPER.easy,
} as const;

function calculateNewEaseFactor(easeFactor: number, rating: Rating): number {
  const q = rating;
  const penalty = (3 - q) * (0.08 + (3 - q) * 0.02);
  const newEF = easeFactor + (0.1 - penalty);

  return Math.max(MIN_EF, Number(newEF.toFixed(2)));
}

function calculateNextReviewDate(currentDate: Date, interval: number): Date {
  const date = new Date(currentDate);
  date.setDate(date.getDate() + interval);
  date.setHours(12, 0, 0, 0); // Fixed review time
  return date;
}

function calculateStudyProgress(
  currentProgress: number,
  rating: Rating,
): number {
  const modifier = ANSWER.isAgain(rating)
    ? -0.3
    : ANSWER.isHard(rating)
      ? -0.1
      : ANSWER.isGood(rating)
        ? 0.2
        : 0.3;

  const newProgress = currentProgress + (100 - currentProgress) * modifier;
  return Math.min(100, Math.max(0, newProgress));
}

export default function updateSrs(
  input: SrsUpdateInput,
  rating: Rating,
): SrsUpdateOutput {
  let { easeFactor, interval, studyProgress, repetition } = input;
  const now = new Date();

  // 1. Determine answer correctness
  const isCorrect = rating >= RATING_MAPPER.hard; // Treat "Hard" as correct

  // 2. Update repetitions
  if (!isCorrect) {
    repetition = 0;
  } else {
    repetition += 1;
  }

  // 3. Calculate new ease factor
  easeFactor = calculateNewEaseFactor(easeFactor, rating);

  // 4. Calculate interval (SM-2 rules)

  // По стандарту SM-2: всегда interval = 1
  // Для агрессивного повторения: interval = 0 только для "Again"
  if (!isCorrect) {
    interval = 1; // SM-2 standard reset interval = 1
  } else {
    switch (repetition) {
      case 1:
        interval = 1;
        break;
      case 2:
        interval = 6;
        break;
      default:
        interval = Math.round(interval * easeFactor);
    }
  }

  // 5. Update study progress
  studyProgress = calculateStudyProgress(studyProgress, rating);

  // 6. Calculate next review date
  const nextReview = calculateNextReviewDate(now, interval);

  // 7. Determine urgency
  const isUrgent = ANSWER.isAgain(rating);

  return {
    rating,
    isUrgent,
    interval,
    easeFactor: Number(easeFactor.toFixed(2)),
    repetition,
    studyProgress: Math.round(studyProgress),
    lastReviewed: now,
    nextReview,
  };
}
