export type CreatedCardFormValues = {
  deckId: number;
  cards: {
    selected: boolean; // сама карточка
    examples: boolean[]; // её примеры
  }[];
};
