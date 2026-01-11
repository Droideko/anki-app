import { AxiosRequestConfig } from 'axios';

export interface ErrorResponseData {
  statusCode: number;
  message: string | string[];
  error: string;
  errors?: Record<string, unknown>;
}

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

declare const brand: unique symbol;
export type Brand<T, TBrand> = T & { [brand]: TBrand };

export type PartialWithRequiredKeys<T, K extends keyof T> = Pick<T, K> &
  Partial<Omit<T, K>>;
