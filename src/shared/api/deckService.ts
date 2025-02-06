import { handleApiRequest } from './apiHelpers';

import { apiClient } from '@shared/api/apiClient';
import { API_ENDPOINTS } from '@shared/api/endpoints';
import { Card } from '@shared/store/useCardsStore';
import { Deck, DeckFormData, DeckWithCards } from '@shared/types/deck';

export interface UpdateCardDto {
  id?: number;
  front?: string;
  back?: string;
  deleted?: boolean;
  // tagIds?: number[];
}

export const deckService = {
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

// При удалении карты с id = 5, сервер возвращает следующий ответ:
// [
//   {
//     "id": 5,
//     "front": "Question 3",
//     "back": "Answer 3",
//     "deckId": 35,
//     "createdAt": "2024-12-09T18:25:02.176Z",
//     "updatedAt": "2024-12-09T18:25:02.176Z"
//   }
// ]

// При удалении карты с id = 6, сервер возвращает следующий ответ:
// Обновление карточки с id = 7
// Добавление новой карточки
// [
//   {
//     "id": 6,
//     "front": "Question 4",
//     "back": "Answer 4",
//     "deckId": 35,
//     "createdAt": "2024-12-09T18:25:02.176Z",
//     "updatedAt": "2024-12-09T18:25:02.176Z"
//   },
//   {
//     "id": 7,
//     "front": "UPDATED Guten Morgen!\nWie geht es dir heute?",
//     "back": "UPDATED Доброе утро!\nКак ты сегодня?",
//     "deckId": 35,
//     "createdAt": "2024-12-11T15:54:00.357Z",
//     "updatedAt": "2025-01-13T23:13:12.516Z"
//   },
//   {
//     "id": 17,
//     "front": "New question 1",
//     "back": "New answer 1",
//     "deckId": 35,
//     "createdAt": "2025-01-13T23:13:12.516Z",
//     "updatedAt": "2025-01-13T23:13:12.516Z"
//   }
// ]
