export default function buildPayload(
  initialCards: Array<{ id: number; front: string; back: string }>,
  newCards: Array<{ id?: number; front: string; back: string }>,
) {
  const payload = [];

  // 1. Deleted: cards that were in initialCards but are missing in newCards
  for (const oldCard of initialCards) {
    const stillExist = newCards.some((c) => c.id === oldCard.id);
    if (!stillExist) {
      // This means the user deleted this card
      payload.push({ id: oldCard.id, deleted: true });
    }
  }

  // 2. New and/or updated cards
  for (const card of newCards) {
    // (a) New card - no id present
    if (!card.id) {
      payload.push({
        front: card.front,
        back: card.back,
      });
      continue;
    }

    // (b) Existing card (was it in initialCards?), check if fields have changed
    const old = initialCards.find((x) => x.id === card.id);
    if (!old) {
      // Theoretically, if not found in initialCards, it should be "new." But
      // since card.id exists, this is a rare case (or a bug).
      // We can either skip it or add it as new. But skipping makes more sense.
      continue;
    }

    // Compare front/back fields
    const frontChanged = card.front !== old.front;
    const backChanged = card.back !== old.back;
    if (frontChanged || backChanged) {
      // Update the card
      payload.push({
        id: card.id,
        front: card.front,
        back: card.back,
      });
    }
    // Otherwise, do nothing - no changes.
  }

  return payload;
}
