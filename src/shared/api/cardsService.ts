import { handleApiRequest } from './apiHelpers';

import { apiClient } from '@shared/api/apiClient';
import { API_ENDPOINTS } from '@shared/api/endpoints';
import { Card } from '@shared/store/useCardsStore';

interface CardDto {
  front: string;
  back: string;
  tagIds?: number[];
}

interface CreateCardsDto {
  deckId: number;
  cards: CardDto[];
}

interface UpdateCardDto {
  front?: string;
  back?: string;
  tagIds?: number[];
}

export const cardsService = {
  getCards: async (id: number) =>
    handleApiRequest(apiClient.get<Card[]>(API_ENDPOINTS.CARDS.DETAIL(id))),
  createCards: async (data: CreateCardsDto) =>
    handleApiRequest(apiClient.post<Card[]>(API_ENDPOINTS.CARDS.BASE, data)),
  deleteCards: async (id: number) =>
    handleApiRequest(apiClient.delete<Card>(API_ENDPOINTS.CARDS.DETAIL(id))),
  updateCards: async (id: number, data: UpdateCardDto) =>
    handleApiRequest(
      apiClient.patch<Card[]>(API_ENDPOINTS.DECKS.DETAIL(id), data),
    ),
  updateCard: async (id: number, data: UpdateCardDto) =>
    handleApiRequest(
      apiClient.patch<Card>(API_ENDPOINTS.CARDS.DETAIL(id), data),
    ),
};
