import axios, { AxiosError, AxiosResponse } from "axios";
import refreshAccessToken from "../utils/refreshAccessToken";
import {
  deleteTokens,
  getAccessToken,
  getRefreshToken,
  saveTokens,
} from "../utils/authTokens";
import { BASE_URL } from "../constants/api";
import getIsAuthRequest from "../utils/getIsAuthRequest";
import { CustomAxiosRequestConfig, ErrorResponseData } from "../types/global";
// import { router } from "expo-router";

const axiosInstance = axios.create({
  baseURL: BASE_URL, // "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
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
  (error) => Promise.reject(error)
);

// Добавление перехватчика ответов
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ErrorResponseData>) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = await getRefreshToken();

      if (refreshToken) {
        try {
          // Получаем новый accessToken
          const { accessToken } = await refreshAccessToken(refreshToken);
          // Сохраняем новый accessToken
          await saveTokens(accessToken, refreshToken);
          // Обновляем заголовок Authorization
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;

          originalRequest.headers = originalRequest.headers ?? {};
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          // Повторяем исходный запрос
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Если обновление токена не удалось, выполняем выход пользователя
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
      // Сервер вернул ответ с кодом ошибки (например, 400, 401 и т.д.)
      const { status, data } = error.response;
      console.error(`Error ${status}:`, data.message || data);

      // Также можно обработать ошибки в зависимости от статуса
      // if (status === 401) {
      //   // Допустим, если не авторизован
      //   console.warn("Пользователь не авторизован.");
      // }
    } else if (error.request) {
      // Запрос был сделан, но сервер не ответил
      console.error("No response received:", error.request);
    } else {
      // Что-то пошло не так при настройке запроса
      console.error("Request error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
