import { handleApiRequest } from './apiHelpers';

import { apiClient } from '@shared/api/apiClient';
import { API_ENDPOINTS } from '@shared/api/endpoints';
import { GenerateFormData } from '@shared/types/language';

export type Card = {
  front: string;
  back: string;
  examples?: Card[];
};

export type GeneratedResponse = {
  frontLanguage: 'English' | 'German' | 'Russian' | 'Spanish';
  backLanguage: 'English' | 'German' | 'Russian' | 'Spanish';
};

export type GenerateRequest = {
  front: string;
  back: string;
};

export const openaiService = {
  generateCards: async (data: GenerateFormData) =>
    handleApiRequest(apiClient.post<Card[]>(API_ENDPOINTS.OPENAI.BASE, data)),

  detectLanguage: async (data: { cards: GenerateRequest[] }) =>
    handleApiRequest(
      apiClient.post<GeneratedResponse>(API_ENDPOINTS.OPENAI.GENERATE, data),
    ),
};
