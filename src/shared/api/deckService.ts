import { handleApiRequest } from './apiHelpers';

import { apiClient } from '@shared/api/apiClient';
import { API_ENDPOINTS } from '@shared/api/endpoints';
import { Card } from '@shared/store/useCardsStore';
import { Deck, DeckFormData, DeckWithCards } from '@shared/types/deck';

// export interface UpdateCardDto {
//   id?: number;
//   front?: string;
//   back?: string;
//   deleted?: boolean;
//   examples?: {
//     front: string;
//     back: string;
//   }[];
//   // tagIds?: number[];
// }

type UpdateExampleDto =
  | { id: number; deleted: true } // удалить
  | { id?: number; front: string; back: string }; // создать или изменить

export type UpdateCardDto =
  | { id: number; deleted: true } // удалить карточку
  | {
      id?: number;
      front?: string;
      back?: string;
      examples?: UpdateExampleDto[];
    };

export const deckService = {
  getDecks: async () =>
    handleApiRequest(apiClient.get<Deck[]>(API_ENDPOINTS.DECKS.BASE)),
  getDeck: async (id: number) =>
    handleApiRequest(
      apiClient.get<DeckWithCards>(API_ENDPOINTS.DECKS.DETAIL(id)),
    ),
  createDeck: async (data: DeckFormData) =>
    handleApiRequest(apiClient.post<Deck>(API_ENDPOINTS.DECKS.BASE, data)),
  deleteDeck: async (id: number) =>
    handleApiRequest(apiClient.delete(API_ENDPOINTS.DECKS.DETAIL(id))),
  updateDeck: async (id: number, data: Partial<DeckFormData>) =>
    handleApiRequest(
      apiClient.patch<Deck>(API_ENDPOINTS.DECKS.DETAIL(id), data),
    ),
  patchDeckCards: async (id: number, data: { cards: UpdateCardDto[] }) =>
    handleApiRequest(
      apiClient.patch<Card[]>(API_ENDPOINTS.DECKS.CARDS(id), data),
    ),
};
