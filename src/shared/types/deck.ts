export interface Deck {
  id: number;
  name: string;
  userId: number;
  categoryId: number;
  accessLevel: string;
  createdAt: string;
  updatedAt: string;
  type: "DECK";
}

export type DeckFormData = {
  name: string;
  categoryId?: number;
  accessLevel?: string;
  sharedWithUserIds?: number[];
};
