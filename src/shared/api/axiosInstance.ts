import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import handleGlobalError from '@shared/api/handleGlobalError';
import {
  deleteTokens,
  getAccessToken,
  getRefreshToken,
  saveTokens,
} from '@shared/utils/authTokens';
import getIsAuthRequest from '@shared/utils/getIsAuthRequest';
import { HTTP_STATUS } from '@shared/constants/httpStatusCodes';
import { BASE_URL } from '@shared/constants/api';
import {
  CustomAxiosRequestConfig,
  ErrorResponseData,
} from '@shared/types/global';
import refreshAccessToken from '@shared/utils/refreshAccessToken';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const isAuthRequest = getIsAuthRequest(config);

    if (!isAuthRequest) {
      const token = await getAccessToken();

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ErrorResponseData>) => {
    if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      const refreshToken = await getRefreshToken();

      if (!refreshToken) {
        await deleteTokens();
        return Promise.reject(error);
      }

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
        return Promise.reject(refreshError);
      }
    }

    handleGlobalError(error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
