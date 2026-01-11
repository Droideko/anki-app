import { apiClient } from '@shared/api/apiClient';
import { AuthResponse, Tokens, User } from '@shared/types/auth';
import { API_ENDPOINTS } from '@shared/api/endpoints';
import { SignUpFormData } from '@shared/types/category';
import { handleApiRequest } from '@shared/api/apiHelpers';

export const authService = {
  signUp: async (data: SignUpFormData) =>
    handleApiRequest(
      apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, data),
    ),
  login: async (data: SignUpFormData) =>
    handleApiRequest(
      apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, data),
    ),
  refreshToken: async (refreshToken: string) =>
    handleApiRequest(
      apiClient.post<Tokens>(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
        refreshToken,
      }),
    ),
  getUserProfile: async () =>
    handleApiRequest(apiClient.get<User>(API_ENDPOINTS.AUTH.USER_PROFILE)),
  finishFirstLogin: async () =>
    handleApiRequest(apiClient.patch<User>(API_ENDPOINTS.AUTH.FINISH_LOGIN)),
  updateUser: async (data: Partial<User>) =>
    handleApiRequest(
      apiClient.patch<User>(API_ENDPOINTS.AUTH.USER_PROFILE, data),
    ),
};
