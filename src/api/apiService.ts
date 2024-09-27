import { SignUpFormData } from "@/components/auth/types";
import { apiClient } from "./apiClient";
import { User } from "../types/auth";
// import { User } from "../data/models/userModel";

export const apiService = {
  signUp: (data: SignUpFormData) => {
    return apiClient.post("/auth/register", data);
  },
  login: (data: SignUpFormData) => {
    return apiClient.post("/auth/login", data);
  },
  refreshToken: async (
    refreshToken: string
  ): Promise<{ accessToken: string }> => {
    const response = await apiClient.post("/refresh", { refreshToken });
    return response.data;
  },
  getUserProfile: () => {
    return apiClient.get<User>("users/profile");
  },

  // Добавляйте другие методы API
};
