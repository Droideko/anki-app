import axios, { AxiosError } from 'axios';

import { ErrorResponseData } from '@shared/types/global';

export class ApiError<T = ErrorResponseData> extends Error {
  statusCode: number;
  data: T;

  constructor(message: string, statusCode: number, data: T) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.data = data;
  }
}

export const handleApiRequest = async <T>(
  request: Promise<{ data: T }>,
): Promise<T> => {
  try {
    const response = await request;
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponseData>;
      if (axiosError.response) {
        const { status, data } = axiosError.response;
        const errorMessage = Array.isArray(data.message)
          ? data.message.join(', ')
          : data.message;
        throw new ApiError(errorMessage || 'API Error', status, data);
      } else if (axiosError.request) {
        throw new Error('No response received from server.');
      } else {
        throw new Error(axiosError.message);
      }
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};
