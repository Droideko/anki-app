export const DEFAULT_CREATE_DECK_VALUES = {
  name: "",
} as const;

export type CreateDeckData = typeof DEFAULT_CREATE_DECK_VALUES;
