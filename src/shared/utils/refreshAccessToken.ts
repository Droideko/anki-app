import axios from 'axios';

import { BASE_URL } from '@shared/constants/api';

export default async function refreshAccessToken(
  refreshToken: string,
): Promise<{ accessToken: string }> {
  const response = await axios.post(`${BASE_URL}/auth/refresh`, {
    refreshToken,
  });
  return response.data;
}
