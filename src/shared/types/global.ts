import { AxiosRequestConfig } from "axios";

export interface ErrorResponseData {
  statusCode: number;
  message: string | string[];
  error: string;
}

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

declare const brand: unique symbol;
export type Brand<T, TBrand> = T & { [brand]: TBrand };
