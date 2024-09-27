import axiosInstance from "./axiosInstance";

// export interface ApiResponse<T = any> {
//   data: T;
//   message?: string;
// }

// export const apiClient = {
//   get: <T>(url: string) => axiosInstance.get<ApiResponse<T>>(url),
//   post: <T>(url: string, data: any) =>
//     axiosInstance.post<ApiResponse<T>>(url, data),
//   put: <T>(url: string, data: any) =>
//     axiosInstance.put<ApiResponse<T>>(url, data),
//   delete: <T>(url: string) => axiosInstance.delete<ApiResponse<T>>(url),
// };

export const apiClient = {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
};
