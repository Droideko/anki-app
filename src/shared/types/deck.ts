import { Card } from '@shared/store/useCardsStore';

export interface Deck {
  id: number;
  name: string;
  userId: number;
  categoryId: number;
  accessLevel: string;
  createdAt: string;
  updatedAt: string;
  type: 'DECK';
}

export interface DeckWithCardIds extends Deck {
  cardIds?: number[];
}

export interface DeckWithCards extends Deck {
  cards: Card[];
}

export type DeckFormData = {
  name: string;
  categoryId?: number;
  accessLevel?: string;
  sharedWithUserIds?: number[];
};
