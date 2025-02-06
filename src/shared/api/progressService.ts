import { apiClient } from './apiClient';
import { handleApiRequest } from './apiHelpers';
import { API_ENDPOINTS } from './endpoints';

import { PartialWithRequiredKeys } from '@features/decks/components/DeckCardsContainer';
import { Progress } from '@shared/store/useProgressStore';

type PatchProgressItemDto = Omit<
  PartialWithRequiredKeys<Progress, 'userId' | 'cardId'>,
  'id' | 'createdAt' | 'updatedAt' | 'dirty'
>;

export const progressService = {
  getProgress: async (id: number) =>
    handleApiRequest(
      apiClient.get<Progress[]>(API_ENDPOINTS.PROGRESS.DETAIL(id)),
    ),
  batchProgress: async (data: { items: PatchProgressItemDto[] }) =>
    handleApiRequest(
      apiClient.patch<Progress[]>(API_ENDPOINTS.PROGRESS.BATCH, data),
    ),
};
