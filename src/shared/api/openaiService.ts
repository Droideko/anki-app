import { handleApiRequest } from './apiHelpers';

import { apiClient } from '@shared/api/apiClient';
import { API_ENDPOINTS } from '@shared/api/endpoints';
import { GenerateFormData } from '@shared/types/language';

export type Card = {
  front: string;
  back: string;
  examples?: Card[];
};

export type GeneratedCard = {
  cards: Card[];
};

export const openaiService = {
  generateCards: async (data: GenerateFormData) =>
    handleApiRequest(
      apiClient.post<GeneratedCard>(API_ENDPOINTS.OPENAI.BASE, data),
    ),
};
