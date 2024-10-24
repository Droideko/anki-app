import { apiClient } from '@shared/api/apiClient';
import { Category } from '@shared/types/category';
import { CategoryFormData } from '@features/categories/types';
import { API_ENDPOINTS } from '@shared/api/endpoints';

export const categoryService = {
  getCategories: async () => {
    return apiClient.get<Category[]>(API_ENDPOINTS.CATEGORIES.BASE);
  },
  getCategory: async (id: number) => {
    return apiClient.get<Category>(API_ENDPOINTS.CATEGORIES.DETAIL(id));
  },
  createCategory: async (data: CategoryFormData) => {
    return apiClient.post(API_ENDPOINTS.CATEGORIES.BASE, data);
  },
  updateCategory: async (id: number, data: Partial<CategoryFormData>) => {
    return apiClient.patch(API_ENDPOINTS.CATEGORIES.DETAIL(id), data);
  },
  deleteCategory: async (id: number, newParentId: number | null = null) => {
    const params = new URLSearchParams();
    params.append('id', id.toString());
    if (newParentId !== null) {
      params.append('newParentId', newParentId.toString());
    }
    return apiClient.delete(
      `${API_ENDPOINTS.CATEGORIES.BASE}?${params.toString()}`,
    );
  },
  deleteAllCategories: async () => {
    return apiClient.delete(API_ENDPOINTS.CATEGORIES.BASE);
  },
};
