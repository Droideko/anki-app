import axios, { AxiosError, AxiosResponse } from 'axios';

import refreshAccessToken from '../utils/refreshAccessToken';
import {
  deleteTokens,
  getAccessToken,
  getRefreshToken,
  saveTokens,
} from '../utils/authTokens';
import { BASE_URL } from '../constants/api';
import getIsAuthRequest from '../utils/getIsAuthRequest';
import { CustomAxiosRequestConfig, ErrorResponseData } from '../types/global';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const IsAuthRequest = getIsAuthRequest(config);

    if (!IsAuthRequest) {
      const token = await getAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ErrorResponseData>) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = await getRefreshToken();

      if (refreshToken) {
        try {
          const { accessToken } = await refreshAccessToken(refreshToken);
          await saveTokens(accessToken, refreshToken);
          axiosInstance.defaults.headers.common['Authorization'] =
            `Bearer ${accessToken}`;

          originalRequest.headers = originalRequest.headers ?? {};
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          await deleteTokens();
          // Возможно, стоит перенаправить пользователя на экран входа
          return Promise.reject(refreshError);
        }
      } else {
        // Если refreshToken отсутствует, выполняем выход пользователя
        await deleteTokens();
        // router.replace("/welcome");
      }
    }

    // Глобальная обработка ошибок
    if (error.response) {
      const { status, data } = error.response;
      console.error(`Error ${status}:`, data.message || data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request error:', error.message);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
