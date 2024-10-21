import { BASE_URL } from "@/src/shared/constants/api";
import axios from "axios";

export default async function refreshAccessToken(
  refreshToken: string
): Promise<{ accessToken: string }> {
  const response = await axios.post(`${BASE_URL}/auth/refresh`, {
    refreshToken,
  });
  return response.data;
}
