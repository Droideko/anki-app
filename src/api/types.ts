import { AxiosRequestConfig } from "axios";

export interface ErrorResponseData {
  statusCode: number;
  message: string | string[];
  error: string;
}

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}
