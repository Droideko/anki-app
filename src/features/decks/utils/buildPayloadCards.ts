type ExampleServer =
  | { id: number; deleted: true }
  | { id?: number; front: string; back: string };

type CardServer =
  | { id: number; deleted: true }
  | {
      id?: number;
      front?: string;
      back?: string;
      examples?: ExampleServer[];
    };

type ExampleInit = { id?: number; front: string; back: string };

type CardInit = {
  id: number;
  front: string;
  back: string;
  examples: ExampleInit[];
};

type ExampleDraft = { id?: number; front: string; back: string };

type CardDraft = {
  id?: number;
  front: string;
  back: string;
  examples?: ExampleDraft[];
};

const diffExamples = (
  initialExamples: ExampleInit[],
  newExamples: ExampleDraft[] = [],
): ExampleServer[] => {
  const result: ExampleServer[] = [];

  const oldById = new Map(initialExamples.map((e) => [e.id, e] as const));

  const newIds = new Set(
    newExamples.map((e) => e.id).filter((id): id is number => id !== undefined),
  );

  for (const oldExample of initialExamples) {
    if (oldExample.id === undefined) continue;

    if (!newIds.has(oldExample.id)) {
      result.push({ id: oldExample.id, deleted: true });
    }
  }

  // b) добавленные / изменённые
  for (const newExample of newExamples) {
    // --- если id нет в старых → это новый пример ---
    if (!newExample.id || !oldById.has(newExample.id)) {
      result.push({ front: newExample.front, back: newExample.back });
      continue;
    }

    // --- сравниваем с исходным ---
    const old = oldById.get(newExample.id)!;
    if (old.front !== newExample.front || old.back !== newExample.back) {
      result.push({
        id: newExample.id,
        front: newExample.front,
        back: newExample.back,
      });
    }
  }

  return result;
};

export default function buildPayload(
  initialCards: CardInit[],
  newCards: CardDraft[],
): CardServer[] {
  const payload: CardServer[] = [];

  /* ===== 1. удалённые карточки ===== */
  const newIds = new Set(newCards.filter((c) => c.id).map((c) => c.id!));
  for (const old of initialCards) {
    if (!newIds.has(old.id)) payload.push({ id: old.id, deleted: true });
  }

  /* ===== 2. новые / изменённые карточки ===== */
  const initialById = new Map(initialCards.map((c) => [c.id, c] as const));

  for (const card of newCards) {
    /* a) новая карточка */
    if (!card.id) {
      payload.push({
        front: card.front,
        back: card.back,
        examples: (card.examples ?? []).map((e) => ({
          front: e.front,
          back: e.back,
        })),
      });
      continue;
    }

    /* b) существующая */
    const old = initialById.get(card.id);
    if (!old) continue; // защита от рассинхрона

    const exDiff = diffExamples(old.examples, card.examples);
    const frontChanged = card.front !== old.front;
    const backChanged = card.back !== old.back;

    if (frontChanged || backChanged || exDiff.length) {
      payload.push({
        id: card.id,
        ...(frontChanged && { front: card.front }),
        ...(backChanged && { back: card.back }),
        ...(exDiff.length && { examples: exDiff }),
      });
    }
  }

  return payload;
}

// export default function buildPayload(
//   initialCards: Array<{ id: number; front: string; back: string }>,
//   newCards: Array<{ id?: number; front: string; back: string }>,
// ) {
//   const payload = [];

//   // 1. Deleted: cards that were in initialCards but are missing in newCards
//   for (const oldCard of initialCards) {
//     const stillExist = newCards.some((c) => c.id === oldCard.id);
//     if (!stillExist) {
//       // This means the user deleted this card
//       payload.push({ id: oldCard.id, deleted: true });
//     }
//   }

//   // 2. New and/or updated cards
//   for (const card of newCards) {
//     // (a) New card - no id present
//     if (!card.id) {
//       payload.push({ front: card.front, back: card.back });
//       continue;
//     }

//     const old = initialCards.find((x) => x.id === card.id);
//     if (!old) {
//       continue;
//     }

//     // Compare front/back fields
//     const frontChanged = card.front !== old.front;
//     const backChanged = card.back !== old.back;
//     if (frontChanged || backChanged) {
//       // Update the card
//       payload.push({ id: card.id, front: card.front, back: card.back });
//     }
//   }

//   return payload;
// }
