import { InternalAxiosRequestConfig } from 'axios';

import { AUTH_EXCLUDED_PATHS } from '@shared/constants/api';

export default function getIsAuthRequest(config: InternalAxiosRequestConfig) {
  return AUTH_EXCLUDED_PATHS.some((url) => config.url?.includes(url));
}
