import { apiClient } from '@shared/api/apiClient';
import { API_ENDPOINTS } from '@shared/api/endpoints';
import { DeckFormData } from '@shared/types/deck';

export const deckService = {
  getDeck: async (id: number) => {
    return apiClient.get(API_ENDPOINTS.DECKS.DETAIL(id));
  },
  createDeck: async (data: DeckFormData) => {
    return apiClient.post(API_ENDPOINTS.DECKS.BASE, data);
  },
  // Добавьте другие методы, связанные с колодами
};
