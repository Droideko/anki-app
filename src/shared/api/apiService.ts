import { SignUpFormData } from "@/src/features/authentication/types";
import { apiClient } from "./apiClient";
import { User } from "../types/auth";
import { DeckFormData } from "../types/deck";
import { Categories, CategoryFormData } from "@/src/features/categories/types";

export const apiService = {
  signUp: async (data: SignUpFormData) => {
    return apiClient.post("/auth/register", data);
  },
  login: async (data: SignUpFormData) => {
    return apiClient.post("/auth/login", data);
  },
  refreshToken: async (
    refreshToken: string
  ): Promise<{ accessToken: string }> => {
    const response = await apiClient.post("/refresh", { refreshToken });
    return response.data;
  },
  getUserProfile: async () => {
    return apiClient.get<User>("users/profile");
  },
  getCategories: async () => {
    return apiClient.get<Categories>("/categories");
  },
  getCategory: async (id: number) => {
    return apiClient.get(`/categories/${id}`);
  },
  createCategory: async (data: CategoryFormData) => {
    return apiClient.post("/categories", data);
  },
  updateCategory: async (id: number, data: Partial<CategoryFormData>) => {
    return apiClient.patch(`/categories/${id}`, data);
  },
  deleteCategory: async (id: number, newParentId: number | null = null) => {
    const params = new URLSearchParams();
    params.append("id", id.toString());
    if (newParentId !== null) {
      params.append("newParentId", newParentId.toString());
    }
    return apiClient.delete(`/categories?${params.toString()}`);
  },
  deleteAllCategories: async () => {
    return apiClient.delete("/categories");
  },

  // getCategories: async () => {
  //   return apiClient.get<Categories>("/categories");
  // },
  getDeck: async (id: number) => {
    return apiClient.get(`/decks/${id}`);
  },
  createDeck: async (data: DeckFormData) => {
    return apiClient.post("/decks", data);
  },
  // updateCategory: async (id: number, data: Partial<CategoryFormData>) => {
  //   return apiClient.patch(`/categories/${id}`, data);
  // },
  // deleteCategory: async (id: number, newParentId: number | null = null) => {
  //   const params = new URLSearchParams();
  //   params.append("id", id.toString());
  //   if (newParentId !== null) {
  //     params.append("newParentId", newParentId.toString());
  //   }
  //   return apiClient.delete(`/categories?${params.toString()}`);
  // },
};
