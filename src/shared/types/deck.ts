import { Card } from '@shared/store/useCardsStore';

export interface Deck {
  id: number;
  name: string;
  userId: number;
  categoryId: number | null;
  accessLevel: string;
  frontLanguage?: string;
  backLanguage?: string;
  fontSize?: number;
  showOnlyBackSound?: boolean;
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
  frontLanguage?: string;
  backLanguage?: string;
  fontSize?: number;
  showOnlyBackSound?: boolean;
};
