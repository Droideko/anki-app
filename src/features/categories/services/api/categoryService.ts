import { apiClient } from '@shared/api/apiClient';
import { Category } from '@shared/types/category';
import { CategoryFormData } from '@features/categories/types';
import { API_ENDPOINTS } from '@shared/api/endpoints';
import { handleApiRequest } from '@shared/api/apiHelpers';

export const categoryService = {
  getCategories: async () =>
    handleApiRequest(apiClient.get<Category[]>(API_ENDPOINTS.CATEGORIES.BASE)),
  getCategory: async (id: number) =>
    handleApiRequest(
      apiClient.get<Category>(API_ENDPOINTS.CATEGORIES.DETAIL(id)),
    ),
  createCategory: async (data: CategoryFormData) =>
    handleApiRequest(
      apiClient.post<Category>(API_ENDPOINTS.CATEGORIES.BASE, data),
    ),
  updateCategory: async (id: number, data: Partial<CategoryFormData>) => {
    return handleApiRequest(
      apiClient.patch<Category>(API_ENDPOINTS.CATEGORIES.DETAIL(id), data),
    );
  },
  deleteCategory: async (id: number, newParentId: number | null = null) => {
    const params = new URLSearchParams();
    params.append('id', id.toString());
    if (newParentId !== null) {
      params.append('newParentId', newParentId.toString());
    }

    return handleApiRequest(
      apiClient.delete(`${API_ENDPOINTS.CATEGORIES.BASE}?${params.toString()}`),
    );
  },
  deleteAllCategories: async () =>
    handleApiRequest(apiClient.delete(API_ENDPOINTS.CATEGORIES.BASE)),
};
